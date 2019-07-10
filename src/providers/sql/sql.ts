import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { WsProvider } from '../../providers/ws/ws';

declare var window: any;

@Injectable()
export class SqlProvider {
  dbName: any;
  constructor(
    public http: HttpClient,
    private file: File,
    public ws: WsProvider,
  ) {
    console.log('get sql provider')
  }
  initializeDatabase() {
    return new Promise((resolve, reject) => {
      this.copyDB('goclientionic.db').then(() => {
        this.copyDB('goappsionic.db').then(() => {
          this.copyDB('gomsapplicationionic.db').then(() => {
            this.copyDB('goproposalionic.db').then(() => {
              this.openDB('goclientionic.db').then(() => {
                this.attachDBSafe('goappsionic.db', 'goapps').then(() => {
                  this.attachDBSafe('gomsapplicationionic.db', 'gomsapplication').then(() => {
                    this.attachDBSafe('goproposalionic.db', 'goproposal').then(() => {
                      resolve()
                    })
                      .catch((err) => {
                        console.log('proposal', err)
                        reject()
                      })
                  })
                    .catch((err) => {
                      console.log('msapp', err)
                      reject()
                    })
                })
                  .catch((err) => {
                    console.log('goapps', err)
                    reject()
                  })
              })
                .catch((err) => {
                  console.log('error', err)
                  reject()
                })
            })
          })
        })
      }, err => {
        this.openDB('goclientionic.db').then(() => {
          this.attachDBSafe('goappsionic.db', 'goapps').then(() => {
            this.attachDBSafe('gomsapplicationionic.db', 'gomsapplication').then(() => {
              this.attachDBSafe('goproposalionic.db', 'goproposal').then(() => {
                resolve()
              })
                .catch((err) => {
                  console.log('proposal', err)
                  reject()
                })
            })
              .catch((err) => {
                console.log('msapp', err)
                reject()
              })
          })
            .catch((err) => {
              console.log('goapps', err)
              reject()
            })
        })
          .catch((err) => {
            console.log('error', err)
            reject()
          })
      })
    });
  }
  //--------------------------------LOADER--------------------------------//
  copyDB(dbname) {
    return new Promise((resolve, reject) => {
      window.plugins.sqlDB.copy(dbname, 2, function () {
        console.log('copy db ' + dbname + ' sukses')
        resolve()
      }, function () {
        console.log('copy db ' + dbname + ' gagal')
        reject()
      });
    });
  }
  attachDBSafe(dbname, alias) {
    return new Promise((resolve, reject) => {
      this.isDBAttached(alias).then((isAttached) => {
        console.log(isAttached)
        if (isAttached) {
          this.detachDB(alias).then(() => {
            this.attachDB(dbname, alias).then(() => {
              resolve()
            })
          })
        } else {
          this.attachDB(dbname, alias).then(() => {
            resolve()
          })
        }
      })
    });
  }
  isDBAttached(dbname) {
    return new Promise((resolve, reject) => {
      this.listAttachedDB().then((res: any) => {
        console.log('res ', res)
        var attached = false;
        for (var i = 0; i < res.length; i++) {
          console.log('dataset ' + res.item(i)['name'])
          if (res.item(i)['name'] == dbname) {
            attached = true;
            console.log(attached)
            resolve(attached)
          }
          else {
            console.log(attached)
            resolve(attached)
          }
        }
      })
    });
  }
  listAttachedDB() {
    return new Promise((resolve, reject) => {
      var sql = "PRAGMA database_list";
      this.executeQuery(sql).then((res) => {
        console.log(res)
        resolve(res)
      }).catch((err) => {
        console.log('error', err)
        reject(err);
      })
    })
  }
  attachDB(dbname, alias) {
    return new Promise((resolve, reject) => {
      var path = this.file.applicationStorageDirectory + (this.isApple() ? "Library/LocalDatabase/" : "databases/") + dbname;
      path = path.replace("file://", "");
      console.log("attach database '" + path + "' as " + alias);
      this.dbName.executeSql("attach database '" + path + "' as " + alias, [], function (res) {
        console.log('attach db ' + dbname + ' sukses')
        resolve(res);
      }, function (error) {
        console.log('attach db ' + dbname + ' gagal')
        reject(error);
      });
    });

  }
  detachDB(dbname) {
    return new Promise((resolve, reject) => {
      this.dbName.executeSql("detach database " + dbname, [], function (res) {
        console.log('detach db ' + dbname + ' sukses')
        resolve(res);
      }, function (error) {
        console.log('detach db ' + dbname + ' gagal')
        reject(error);
      });
    });
  }
  openDB(dbname) {
    var self = this;
    return new Promise((resolve, reject) => {
      console.log('open database')
      window.sqlitePlugin.openDatabase({ name: dbname, location: 2 }, function (db) {
        console.log('123', db)
        self.dbName = db
        resolve(db)
      }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
        reject(error)
      })
    });
  }
  //------------------------------LOADER END---------------------------------//
  //------------------------------
  getDeviceInfo() {
    return new Promise((resolve, reject) => {
      if (this.isMobile()) {
        var sql = "SELECT * FROM goapps.ms_device";
        this.executeQuery(sql).then((res) => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      }
      else {
        reject()
      }
    });
  }

  //--------------------------------------CRUD------------------------------------------//
  executeQuery(string) {
    return new Promise((resolve, reject) => {
      let query = string;
      console.log(query, this.dbName)
      this.dbName.executeSql(query, [], function (res) {
        console.log('result query sukses ', res['rows'])
        resolve(res['rows']);
      }, function (error) {
        console.log('result query error ', error)
        reject(error);
      });
    });
  }
  executeQueryArr(arr) {
    return new Promise((resolve, reject) => {
      if (arr.length) {
        this.dbName.transaction(function (tx) {
          for (var i = 0; i < arr.length; i++) {
            tx.executeSql(arr[i]);
          }
        }, function (error) {
          console.log('Transaction ERROR: ' + error.message);
          reject()
        }, function () {
          console.log('Populated database OK');
          resolve()
        });
      }
    });
  }
  isMobile() {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
      return true;
    } else {
      return false;
    }
  }

  isApple() {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
      return true;
    } else {
      return false;
    }
  }

  isAndroid() {
    if (navigator.userAgent.match(/(Android)/)) {
      return true;
    } else {
      return false;
    }
  }

  isBlackberry() {
    if (navigator.userAgent.match(/(BlackBerry)/)) {
      return true;
    } else {
      return false;
    }
  }

}
