import IPFS from "ipfs"
import all from "it-all"
import toBuffer from "it-to-buffer";

const node = await IPFS.create()

export function useIpfs(){
  async function uploadFile(file){
    return await node.add(file)
  }

  async function uploadFiles(files) {
    return await all(node.addAll(files))
  }

  async function read(ipfsPath) {
    const fileContents = await toBuffer(node.cat(ipfsPath))
    return fileContents.toString()
  }

  async function uploadFilesInDirectory(directory, files) {
    let fileObjectsArray = files.map((file) => {
      return {
        path: directory + "/" +file.name,
        content: file
      }
    })
    return await all(node.addAll(fileObjectsArray, {wrapWithDirectory: true}))
  }

  async function listFilesInDirectory(directoryCID){
    return all(node.ls(directoryCID))
  }

  async function getFilesInDirectory(directoryCID) {
    // 该get方法返回所有文件和子目录的元数据，以及所有文件的内容
    // 它将递归检索内容
    return await all(node.get(directoryCID))
  }

  return {
    uploadFiles,
    uploadFile,
    read,
    uploadFilesInDirectory,
    listFilesInDirectory,
    getFilesInDirectory
  }
}