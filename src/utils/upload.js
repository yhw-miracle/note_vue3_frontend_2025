// 文件上传工具，支持分片上传
// 使用 fetch 实现

/**
 * 分片上传文件
 * @param {File} file - 要上传的文件
 * @param {string} uploadUrl - 上传接口地址
 * @param {number} [chunkSize=2*1024*1024] - 分片大小，默认2MB
 * @param {function} onProgress - 进度回调
 * @returns {Promise<string>} - 返回文件IP或URL
 */
export async function uploadFileInChunks(file, uploadUrl, chunkSize = 2 * 1024 * 1024, onProgress) {
    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploaded = 0;
    let fileId = null;
    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(file.size, start + chunkSize);
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('filename', file.name);
        formData.append('chunkIndex', i);
        formData.append('totalChunks', totalChunks);
        if (fileId) formData.append('fileId', fileId);
        const res = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        if (data.fileId) fileId = data.fileId;
        if (onProgress) onProgress(Math.round(((i + 1) / totalChunks) * 100));
        if (data.error) throw new Error(data.error);
        // 最后一片返回文件IP/url
        if (i === totalChunks - 1 && data.fileUrl) {
            return data.fileUrl;
        }
    }
    throw new Error('上传失败');
}
