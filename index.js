const noblox = require('noblox.js')

const fs = require('fs');

let cursors = ""
let combineddata = '';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function startApp () {
    // You MUST call setCookie() before using any authenticated methods [marked by 🔐]
    // Replace the parameter in setCookie() with your .ROBLOSECURITY cookie.
    const currentUser = await noblox.setCookie("") 
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)
    while (true) {
        const rankLogs = await noblox.getAuditLog(1, "ChangeRank", "", "Asc", 100, cursors)
        cursors = rankLogs.nextPageCursor
        console.log(rankLogs)

        const newlogs = JSON.stringify(rankLogs.data)
        
        combineddata = combineddata + newlogs

        if (rankLogs.nextPageCursor == null) {
            fs.writeFile('ChangeRankAuditLogs.txt', combineddata, err => {
                if (err) {
                  console.error(err);
                }
                // file written successfully
            });
            break
        } 
        await sleep(4000);
    }
    
}
startApp()

