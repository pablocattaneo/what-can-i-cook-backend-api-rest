import fs from 'fs';

export function deleteFile(filePath: fs.PathLike): void {
  fs.unlink(filePath, (error) => {
    if (error) {
      throw (error);
    }
  });
}
