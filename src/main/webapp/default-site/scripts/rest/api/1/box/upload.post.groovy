import org.apache.commons.fileupload.servlet.ServletFileUpload
import org.apache.commons.fileupload.util.Streams

def boxService = applicationContext["studioBoxService"]

response.setHeader("Content-Type", "text/html")

def sendError = { code, msg ->
    response.status = code
    def writer = response.writer
    writer.println("<script>document.domain = \"${request.serverName}\";</script>")
    writer.println("{\"hasError\":true,\"errors\":[\"${msg}\"]}")
    writer.flush()
}

if (ServletFileUpload.isMultipartContent(request)) {
    def upload = new ServletFileUpload()
    def iterator = upload.getItemIterator(request)
    def site = null
    def profileId = null
    while(iterator.hasNext()) {
        def item = iterator.next()
        def name = item.getFieldName()
        def stream = item.openStream()
        if(item.isFormField()) {
            switch(name) {
                case "site":
                    site = Streams.asString(stream)
                    break
                case "profile":
                    profileId = Streams.asString(stream)
                    break
            }
        } else {
            def filename = item.getName()
            try {
                def output = boxService.uploadFile(site, profileId, filename, stream)

                def writer = response.writer
                writer.println("<script>document.domain = \"${request.serverName}\";</script>")
                writer.println("[{\"name\":\"${output.name}\",\"id\":\"${output.id}\"}]")
                writer.flush()
            } catch (e) {
                logger.error("Upload of file ${filename} failed", e)

                sendError(500, "Upload of file failed: ${e.message}")
            }
        }
    }
} else {
    sendError(400, "Request is not of type multi-part")
}