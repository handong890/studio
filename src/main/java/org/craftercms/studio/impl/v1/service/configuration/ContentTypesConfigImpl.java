/*
 * Crafter Studio Web-content authoring solution
 * Copyright (C) 2007-2014 Crafter Software Corporation.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package org.craftercms.studio.impl.v1.service.configuration;

import org.apache.commons.lang.StringUtils;
import org.craftercms.studio.api.v1.constant.CStudioConstants;
import org.craftercms.studio.api.v1.log.Logger;
import org.craftercms.studio.api.v1.log.LoggerFactory;
import org.craftercms.studio.api.v1.service.ConfigurableServiceBase;
import org.craftercms.studio.api.v1.service.configuration.ContentTypesConfig;
import org.craftercms.studio.api.v1.service.content.ContentService;
import org.craftercms.studio.api.v1.to.*;
import org.craftercms.studio.impl.v1.util.ContentFormatUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.Node;

import java.io.Serializable;
import java.util.*;
import java.util.regex.Pattern;

/**
 * @author Dejan Brkic
 */
public class ContentTypesConfigImpl extends ConfigurableServiceBase implements ContentTypesConfig {

    private static final Logger logger = LoggerFactory.getLogger(ContentTypesConfigImpl.class);

    @Override
    public ContentTypeConfigTO getContentTypeConfig(String site, String contentType) {
        String key = createKey(site, contentType);
        checkForUpdate(key);
        return contentTypeMap.get(key);
    }

    /**
     * create configuration key using the site and the content type given
     * : or / in content type name will be replace with -
     *
     * @param site
     * @param contentType
     * @return
     */
    protected String createKey(String site, String contentType) {
        //contentType = ContentUtils.getContentTypeKey(contentType);
        return site + "," + contentType;
    }

    @Override
    protected void loadConfiguration(String key) {
        String configFileFullPath = null;
        if (!StringUtils.isEmpty(key)) {
            // key is a combination of site,content-type
            String [] keys = key.split(",");
            if (keys.length == 2) {
                String site = keys[0];
                String contentType = keys[1];
                String siteConfigPath = _configPath.replaceAll(CStudioConstants.PATTERN_SITE, site)
                        .replaceAll(CStudioConstants.PATTERN_CONTENT_TYPE, contentType);
                configFileFullPath = siteConfigPath + "/" + _configFileName;
            } else {
                logger.error("Invalid content type config key provided: " + key + " site, content type is expected.");
            }
        } else {
            logger.error("Key cannot be empty. site, content type is expected.");
        }
        if (configFileFullPath != null) {
            ContentTypeConfigTO contentTypeConfig = loadConfigurationFile(configFileFullPath);
            this.addContentType(key, contentTypeConfig);
        }
    }

    /**
     * load configuration from the configuration noderef
     * @param configFileFullPath
     */
    @SuppressWarnings("unchecked")
    protected ContentTypeConfigTO loadConfigurationFile(String configFileFullPath) {
        Document document = null;
        try {
            document = contentService.getContentAsDocument(configFileFullPath);
        } catch (DocumentException e) {
            logger.error("No content type configuration document found at " + configFileFullPath, e);
        }
        if (document != null) {
            Element root = document.getRootElement();
            String name = root.valueOf("@name");
            ContentTypeConfigTO contentTypeConfig = new ContentTypeConfigTO();
            contentTypeConfig.setName(name);
            contentTypeConfig.setLabel(root.valueOf("label"));
            String imageThumbnail=root.valueOf("image-thumbnail");
            if(imageThumbnail != null)
                contentTypeConfig.setImageThumbnail(imageThumbnail);
            contentTypeConfig.setForm(root.valueOf("form"));
            boolean previewable = ContentFormatUtils.getBooleanValue(root.valueOf("previewable"));
            contentTypeConfig.setFormPath(root.valueOf("form-path"));
            contentTypeConfig.setPreviewable(previewable);
            contentTypeConfig.setModelInstancePath(root.valueOf("model-instance-path"));
            boolean contentAsFolder = ContentFormatUtils.getBooleanValue(root.valueOf("content-as-folder"));
            contentTypeConfig.setContentAsFolder(contentAsFolder);
            boolean useRoundedFolder = ContentFormatUtils.getBooleanValue(root.valueOf("use-rounded-folder"));
            contentTypeConfig.setUseRoundedFolder(useRoundedFolder);
            List<String> pathIncludes = getPaths(root, "paths/includes/pattern");
            if (pathIncludes.size() == 0) {
                // if no configuration, include every path
                pathIncludes.add(".*");
            }
            contentTypeConfig.setPathIncludes(pathIncludes);
            List<String> pathExcludes = getPaths(root, "paths/excludes/pattern");
            contentTypeConfig.setPathExcludes(pathExcludes);
            //(contentTypeConfig, root.selectNodes("allowed-roles/role"));
            loadRoles(contentTypeConfig, root.selectNodes("allowed-roles/role"));
            loadDeleteDependencies(contentTypeConfig, root.selectNodes("delete-dependencies/delete-dependency"));
            loadCopyDependencyPatterns(contentTypeConfig, root.selectNodes("copy-dependencies/copy-dependency"));
            //contentTypeConfig.setNoThumbnail(ContentFormatUtils.getBooleanValue(root.valueOf("noThumbnail")));
            //SearchConfigTO searchConfig = loadSearchConfig(root.selectSingleNode("search"));
            //contentTypeConfig.setSearchConfig(searchConfig);
            contentTypeConfig.setLastUpdated(new Date());
            contentTypeConfig.setType(getContentTypeTypeByName(name));
            return contentTypeConfig;
        } else {
            logger.error("No content type configuration document found at " + configFileFullPath);
            return null;
        }
    }

    /**
     * load delete dependencies mapping
     *
     * @param contentTypeConfig
     * @param nodes
     */
    protected void loadDeleteDependencies(ContentTypeConfigTO contentTypeConfig, List<Node> nodes) {
        List<DeleteDependencyConfigTO> deleteConfigs = new ArrayList<>();
        if (nodes != null) {
            for (Node node : nodes) {
                Node patternNode = node.selectSingleNode("pattern");
                Node removeFolderNode = node.selectSingleNode("remove-empty-folder");
                if(patternNode!=null){
                    String pattern = patternNode.getText();
                    String removeEmptyFolder = removeFolderNode.getText();
                    boolean isRemoveEmptyFolder=false;
                    if(removeEmptyFolder!=null){
                        isRemoveEmptyFolder = Boolean.valueOf(removeEmptyFolder);
                    }
                    if(StringUtils.isNotEmpty(pattern)){
                        DeleteDependencyConfigTO deleteConfigTO = new DeleteDependencyConfigTO(pattern, isRemoveEmptyFolder);
                        deleteConfigs.add(deleteConfigTO);
                    }
                }
            }
            contentTypeConfig.setDeleteDependencies(deleteConfigs);
        }
    }

    /**
     * Checks name for naming convention.
     * @param name Name to be check
     * @return <ul>
     * <li><b>component</b> if the name matches component naming convention</li>
     * <li><b>page</b> if the name matches page naming convention</li>
     * <li><b>unknown</b> if name don't match any known convention</li>
     * </ul>
     */
    private String getContentTypeTypeByName(String name) {
        if (Pattern.matches("/component/.*?", name)) {
            return "component";
        } else if (Pattern.matches("/page/.*?", name))
            return "page";
        else {
            return "unknown";
        }
    }

    /**
     * get paths
     *
     * @param root
     * @param path
     * @return
     */
    private List<String> getPaths(Element root, String path) {
        List<String> paths = null;
        List<Node> nodes = root.selectNodes(path);
        if (nodes != null && nodes.size() > 0) {
            paths = new ArrayList<String>(nodes.size());
            for (Node node : nodes) {
                String role = node.getText();
                if (!StringUtils.isEmpty(role)) {
                    paths.add(role);
                }
            }
        } else {
            paths = new ArrayList<String>();
        }
        return paths;
    }

    /**
     * load a list of allowed roles
     * @param config
     * @param nodes
     */
    protected void loadRoles(ContentTypeConfigTO config, List<Node> nodes) {
        Set<String> roles = null;
        if (nodes != null && nodes.size() > 0) {
            roles = new HashSet<String>(nodes.size());
            for (Node node : nodes) {
                String role = node.getText();
                if (!StringUtils.isEmpty(role)) {
                    roles.add(role);
                }
            }
        } else {
            roles = new HashSet<String>();
        }
        config.setAllowedRoles(roles);
    }

    /**
     * add a content type to the mapping
     *
     * @param key
     * @param contentTypeConfig
     */
    protected void addContentType(String key, ContentTypeConfigTO contentTypeConfig) {
        if (!StringUtils.isEmpty(key) && contentTypeConfig != null) {
            if (contentTypeMap.get(key) != null) {
                removeConfiguration(key);
            }
            contentTypeMap.put(key, contentTypeConfig);
            //_contentTypeNodeMap.put(nodeRef.toString(), key);
            addToPathMapping(key, contentTypeConfig);
        }
    }

    /**
     * add configuration to path mapping
     *
     * @param key
     * @param configToAdd
     */
    protected void addToPathMapping(String key, ContentTypeConfigTO configToAdd) {
        logger.debug("Adding a path configuration to mapping with key: " + key);
        String [] values = key.split(",");
        String site = values[0];
        SiteContentTypePathsTO paths = this.pathMapping.get(site);
        if (paths != null) {
            boolean added = false;
            // find a matching path configuration and add
            for (String pathInclude : configToAdd.getPathIncludes()) {
                for (ContentTypePathTO pathTO : paths.getConfigs()) {
                    if (pathTO.getPathInclude().equalsIgnoreCase(pathInclude)) {
                        logger.debug("Adding " + key + " to " + pathInclude);
                        pathTO.addToAllowedContentTypes(key);
                        added = true;
                    }
                }
                // if no same pathInclude found, create a new one
                if (!added) {
                    logger.debug("Creating a new include for " + key + " with " + pathInclude);
                    ContentTypePathTO pathTO = createNewPathConfig(pathInclude, key, configToAdd);
                    paths.getConfigs().add(pathTO);
                }
            }
            paths.setLastUpdated(new Date());
        } else {
            logger.debug("No configuration exists. adding a new record.");
            // add new content type path mapping
            SiteContentTypePathsTO newPaths = new SiteContentTypePathsTO();
            List<String> pathIncludes = configToAdd.getPathIncludes();
            List<ContentTypePathTO> configs = new ArrayList<ContentTypePathTO>();
            for (String pathInclude : pathIncludes) {
                ContentTypePathTO pathTO = createNewPathConfig(pathInclude, key, configToAdd);
                configs.add(pathTO);
            }
            newPaths.setConfigs(configs);
            newPaths.setLastUpdated(new Date());
            this.pathMapping.put(site, newPaths);
        }
    }

    /**
     * create a new path configuration
     *
     * @param pathInclude
     * @param key
     * @param config
     * @return
     */
    private ContentTypePathTO createNewPathConfig(String pathInclude, String key, ContentTypeConfigTO config) {
        ContentTypePathTO pathTO = new ContentTypePathTO();
        pathTO.setPathInclude(pathInclude);
        pathTO.addToAllowedContentTypes(key);
        return pathTO;
    }

    @Override
    protected TimeStamped getConfigurationById(String key) {
        return contentTypeMap.get(key);
    }

    @Override
    protected void removeConfiguration(String key) {
        if (!StringUtils.isEmpty(key)) {
            ContentTypeConfigTO contentTypeConfig = contentTypeMap.get(key);
            if (contentTypeConfig != null) {
                contentTypeMap.remove(key);
                //contentTypeNodeMap.remove(contentTypeConfig.getNodeRef());
                removeFromPathMapping(key, contentTypeConfig);
            }
        }
    }

    protected void removeFromPathMapping(String key, ContentTypeConfigTO configToRemove) {
        String [] values = key.split(",");
        String site = values[0];
        SiteContentTypePathsTO paths = this.pathMapping.get(site);
        if (paths != null) {
            for (String pathInclude : configToRemove.getPathIncludes()) {
                for (ContentTypePathTO pathTO : paths.getConfigs()) {
                    if (pathTO.getPathInclude().equalsIgnoreCase(pathInclude)) {
                        pathTO.removeAllowedContentTypes(key);
                    }
                }
            }
            paths.setLastUpdated(new Date());
        }
    }

    /**
     *
     * @param config
     * @param copyDependencyNodes
     * @return
     */
    protected void loadCopyDependencyPatterns(ContentTypeConfigTO config, List<Node> copyDependencyNodes) {
        List<CopyDependencyConfigTO> copyConfig = new ArrayList<CopyDependencyConfigTO>();
        if (copyDependencyNodes != null) {
            for (Node copyDependency : copyDependencyNodes) {
                Node patternNode = copyDependency.selectSingleNode("pattern");
                Node targetNode = copyDependency.selectSingleNode("target");
                if(patternNode!=null && targetNode!=null){
                    String pattern = patternNode.getText();
                    String target = targetNode.getText();
                    if(StringUtils.isNotEmpty(pattern) && StringUtils.isNotEmpty(target)){
                        CopyDependencyConfigTO copyDependencyConfigTO  = new CopyDependencyConfigTO(pattern,target);
                        copyConfig.add(copyDependencyConfigTO);
                    }
                }
            }
        }
        config.setCopyDepedencyPattern(copyConfig);

    }

    public ContentTypeConfigTO loadConfiguration(String site, ContentItemTO configItem) {
        String key = contentTypeNodeMap.get(site + ":" + configItem.getPath());
        // if key is found, check the timestamp
        if (!StringUtils.isEmpty(key)) {
            ContentTypeConfigTO contentTypeConfig = contentTypeMap.get(key);
            if (contentTypeConfig != null) {
                Date modifiedDate = configItem.getLastEditDate();
                if (! (modifiedDate.after(contentTypeConfig.getLastUpdated()))) {
                    // if the node modified date is not after the timestamp, no need to load again
                    logger.debug("Skipping loading " + key + " since it is previsouly loaded and no change was made.");
                    return contentTypeConfig;
                }
            }
        }
        logger.debug("Loading configuration from " + key + " since it is not loaded or configuration file is updated.");

        // otherwise load the configuration file
        ContentTypeConfigTO contentTypeConfig = loadConfigurationFile(configItem.getUri());
        key = this.createKey(site, contentTypeConfig.getName());
        this.addContentType(key, contentTypeConfig);
        return contentTypeConfig;
    }

    @Override
    public SiteContentTypePathsTO getPathMapping(String site) {
        return pathMapping.get(site);
    }

    @Override
    public ContentTypeConfigTO getContentTypeConfig(String key) {
        checkForUpdate(key);
        return contentTypeMap.get(key);
    }

    @Override
    public void register() {
        this.getServicesManager().registerService(ContentTypesConfig.class, this);
    }

    public Map<String, SiteContentTypePathsTO> getPathMapping() { return pathMapping; }
    public void setPathMapping(Map<String, SiteContentTypePathsTO> pathMapping) { this.pathMapping = pathMapping; }

    public ContentService getContentService() { return contentService; }
    public void setContentService(ContentService contentService) { this.contentService = contentService; }

    protected Map<String, ContentTypeConfigTO> contentTypeMap = new HashMap<String, ContentTypeConfigTO>();
    protected Map<String, SiteContentTypePathsTO> pathMapping = new HashMap<String, SiteContentTypePathsTO>();
    /** a map of noderefs as string and keys (site, content-type-name) **/
    protected Map<String, String> contentTypeNodeMap = new HashMap<String, String>();
    protected ContentService contentService;
}