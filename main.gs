/* ==============================================================
Daily Backup to GDrive
v1.0

Backup to root_folder/yyyy/mm/dd/

Author: Tatsuya Fukata <tatsuya.fukata@gmail.com>
============================================================== */

function getConfig() {
  return {
    folderId: '', // root folder
    now: new Date(),
  };
}

function doBackup(config) {
  var resp = fetchFile(config);
  var fileName = SpreadsheetApp.getActiveSpreadsheet().getName();
  var fileBlob = resp.getBlob().setName(fileName);
  var folder = createFolders(config);
  if ( !folder.getFilesByName(fileName).hasNext() ) {
    folder.createFile(fileBlob);
  }
}

function fetchFile(config) {
 var ssID = SpreadsheetApp.getActiveSpreadsheet().getId();
  var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  url = url.replace(/edit$/,'');
  var url_ext = "export?exportFormat=xlsx&id=" + ssID;
  return UrlFetchApp.fetch(url + url_ext, {
    headers: {
      "Authorization": 'Bearer ' + ScriptApp.getOAuthToken(),
      "muteHttpExceptions": true
    }
  });
}

function createFolders(config) {
  var f1 = createFolder(DriveApp.getFolderById(config.folderId), config.now.getFullYear());
  var f2 = createFolder(f1, zeroPadding(config.now.getMonth() + 1));
  return createFolder(f2, zeroPadding(config.now.getDay()));
}

function createFolder(folder, name) {
  folders = folder.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return folder.createFolder(name);
  }
}

function zeroPadding(num) {
  return num > 10 ? num : '0' + num;
}

function main() {
  doBackup(getConfig())
}

