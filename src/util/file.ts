import fs from "fs";

export function deleteFile(filePath: fs.PathLike) {
  fs.unlink(filePath, error => {
    if (error) {
      throw (error)
    }
  });
};
