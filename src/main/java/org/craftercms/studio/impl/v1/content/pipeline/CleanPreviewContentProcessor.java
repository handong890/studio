/*
 * Crafter Studio Web-content authoring solution
 * Copyright (C) 2007-2016 Crafter Software Corporation.
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
package org.craftercms.studio.impl.v1.content.pipeline;


import org.craftercms.studio.api.v1.content.pipeline.PipelineContent;
import org.craftercms.studio.api.v1.exception.ContentProcessException;
import org.craftercms.studio.api.v1.log.Logger;
import org.craftercms.studio.api.v1.log.LoggerFactory;
import org.craftercms.studio.api.v1.to.ResultTO;

public class CleanPreviewContentProcessor extends BaseContentProcessor {
    private static final Logger logger = LoggerFactory.getLogger(CleanPreviewContentProcessor.class);

    public static final String NAME = "CleanPreviewContentProcessor";

    /**
     * default constructor
     */
    public CleanPreviewContentProcessor() {
        super(NAME);
    }

    /**
     * constructor that sets the process name
     *
     * @param name
     */
    public CleanPreviewContentProcessor(String name) {
        super(name);
    }


    public void process(PipelineContent content, ResultTO result) throws ContentProcessException {
        /*
        String site = (String) content.getProperty(DmConstants.KEY_SITE);
        String folderPath = (String) content.getProperty(DmConstants.KEY_FOLDER_PATH);
        String fileName = (String) content.getProperty(DmConstants.KEY_FILE_NAME);
        String path = folderPath + "/" + fileName;
        String skipPreview = content.getProperty(DmConstants.KEY_SKIP_CLEAN_PREVIEW);
        Boolean skipClean = Boolean.valueOf(skipPreview);
        if (!skipClean) {
            try {
                DmPreviewService dmPreviewService = getServicesManager().getService(DmPreviewService.class);
                dmPreviewService.cleanContent(site, path);
            } catch (ServiceException e) {
                logger.error("Could not clean to");
                throw new ContentProcessException("Failed to clean up preview for " + content.getId(), e);
            }
        }*/
    }
}
