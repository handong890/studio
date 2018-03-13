/*
 * Crafter Studio Web-content authoring solution
 * Copyright (C) 2007-2018 Crafter Software Corporation. All rights reserved.
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


import groovy.json.JsonException
import groovy.json.JsonSlurper
import org.apache.commons.lang3.StringUtils
import org.craftercms.studio.api.v1.exception.SiteNotFoundException
import scripts.api.ContentServices

def result = [:]
try {
    def requestBody = request.reader.text

    def slurper = new JsonSlurper()
    def parsedReq = slurper.parseText(requestBody)

    def siteId = parsedReq.site_id
    def remoteName = parsedReq.remote_name
    def remoteUrl = parsedReq.remote_url
    def authenticationType = parsedReq.authentication_type
    def remoteUsername = parsedReq.remote_username
    def remotePassword = parsedReq.remote_password
    def remoteToken = parsedReq.remote_token
    def remotePrivateKey = parsedReq.remote_private_key

/** Validate Parameters */
    def invalidParams = false
    def paramsList = []

// site_id
    try {
        if (StringUtils.isEmpty(siteId)) {
            invalidParams = true
            paramsList.add("site_id")
        }
    } catch (Exception exc) {
        invalidParams = true
        paramsList.add("site_id")
    }

    // remote_name
    try {
        if (StringUtils.isEmpty(remoteName)) {
            invalidParams = true
            paramsList.add("remote_name")
        }
    } catch (Exception exc) {
        invalidParams = true
        paramsList.add("remote_name")
    }

    // remote_url
    try {
        if (StringUtils.isEmpty(remoteUrl)) {
            invalidParams = true
            paramsList.add("remote_url")
        }
    } catch (Exception exc) {
        invalidParams = true
        paramsList.add("remote_url")
    }

    // authentication_type
    try {
        if (StringUtils.isEmpty(authenticationType)) {
            invalidParams = true
            paramsList.add("authentication_type")
        }
    } catch (Exception exc) {
        invalidParams = true
        paramsList.add("authentication_type")
    }

    // remote_username
    try {
        if (StringUtils.equalsIgnoreCase('basic') && (StringUtils.isEmpty(remoteUsername))) {
            invalidParams = true
            paramsList.add("remote_username")
        }
    } catch (Exception exc) {
        invalidParams = true
        paramsList.add("remote_username")
    }

    // remote_password
    try {
        if (StringUtils.equalsIgnoreCase('basic') && (StringUtils.isEmpty(remotePassword))) {
            invalidParams = true
            paramsList.add("remote_passsword")
        }
    } catch (Exception exc) {
        invalidParams = true
        paramsList.add("remote_password")
    }

    // remote_token
    try {
        if (StringUtils.equalsIgnoreCase('token') && (StringUtils.isEmpty(remoteToken))) {
            invalidParams = true
            paramsList.add("remote_token")
        }
    } catch (Exception exc) {
        invalidParams = true
        paramsList.add("remote_token")
    }

    // remote_private_key
    try {
        if (StringUtils.equalsIgnoreCase('key') && (StringUtils.isEmpty(remotePrivateKey))) {
            invalidParams = true
            paramsList.add("remote_private_key")
        }
    } catch (Exception exc) {
        invalidParams = true
        paramsList.add("remote_private_key")
    }

    if (invalidParams) {
        response.setStatus(400)
        result.message = "Invalid parameter: "  + paramsList
    } else {
        def context = ContentServices.createContext(applicationContext, request)

        try {
            ContentServices.addRemote(context, siteId, remoteName, remoteUrl, authenticationType, remoteUsername, remotePassword, remoteToken, remotePrivateKey)
            response.setStatus(200)
            result.message = "OK"
        } catch (SiteNotFoundException e) {
            response.setStatus(404)
            result.message = "Site not found"
        } catch (Exception e) {
            response.setStatus(500)
            result.message = "Internal server error: \n" + e
        }
    }
} catch (JsonException e) {
    response.setStatus(400)
    result.message = "Bad Request"
}
return result