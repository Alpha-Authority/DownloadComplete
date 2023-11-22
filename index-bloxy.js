// In an async environment
const bloxy = require("bloxy");
const fs = require('fs');

let combineddata = ''
let combineddataall = ''
let placeidarray_aa2022 = [
    315434020,
    287253489,
    302882067,
    324244228,
    105749349,
    694907740,
    315349898,
    426062864,
    328853267,
    347581929,
    325109856,
    327016149,
    318313777,
    322795767,
    325107118,
    334868053,
    873736026,
    920228192,
    938488038,
    1326428906,
    1365944801,
    1389643758,
    1389643771,
    1404891954,
    1461395750,
    2984381708,
    2984559506,
    2984559515,
    4534848410,
    5098661978,
    6279059015,
    6496525871,
    6686221831,
    7433310235,
    7433310235,
    8650743570,
    8817235544
]

let placeidarray_tna2022 = [
    6152804216,
    6200345357,
    6217778442,
    6224062015,
    6311777403,
    6589274866,
    6589276406,
    6646850512,
    6692765153,
    6958410916,
    7036469189,
    7344691990,
    7471600819,
    7591718216,
    8874976962,
    8937409932,
    8960379156,
    8990806765,
    9203451102,
    9230781756,
]

let placeidarray_voa2022 = [
    6336210948,
    7192578176,
]

async function startApp () {

    const client = new bloxy.Client({
        credentials: {
            cookie: ""
        }
    });

    const authenticatedUser = await client.login()

    console.log(`Logged in as ${authenticatedUser.id}`) // --> "Logged in as X"
    let i = 0
    while (true) {
        combineddata = ''
        if (i == placeidarray.length) {
            fs.writeFile(`tna_game_statistics.json`, combineddataall, err => {
                if (err) {
                console.error(err);
                }
                // file written successfully
            });
            console.log('Quitting')
            break
        }
        let placeid = placeidarray[i]
        combineddata = combineddata + `Game Statistics [` + (i + 1) + `] [` +  placeid + `]\n\n` 

        console.log('Doing Game Data')
        //const gameData = client.apis.gamesAPI.getMultiPlaces({placeIds: [placeid]})

        //combineddata = combineddata + `Place ID: ${placeid} | Place Name: ${gameData.name} | By: ${gameData.builder} | URL: ${gameData.url}\n`

        //combineddata = combineddata + JSON.stringify(gameData) + `\n`
     
        console.log('Doing Visits')
        const Visits = await client.apis.developAPI.getPlaceStatistics({placeId: placeid,type: "Visits",granularity: "Monthly" })

        combineddata = combineddata + `${placeid} - Visits\n` + JSON.stringify(Visits) + `\n` 

        console.log('Doing AverageVisitLength')
        const AverageVisitLength = await client.apis.developAPI.getPlaceStatistics({placeId: placeid,type: "AverageVisitLength",granularity: "Monthly"})

        combineddata = combineddata + `${placeid} - Average Visit Length\n` + JSON.stringify(AverageVisitLength) + `\n` 
        
        console.log('Doing RevenuePerVisit')
        const RevenuePerVisit = await client.apis.developAPI.getPlaceStatistics({placeId: placeid,type: "RevenuePerVisit",granularity: "Monthly"})

        combineddata = combineddata + `${placeid} - Revenue Per Visit\n` + JSON.stringify(RevenuePerVisit) + `\n` 

        console.log('Doing Revenue')
        const Revenue = await client.apis.developAPI.getPlaceStatistics({placeId: placeid,type: "Revenue",granularity: "Monthly"})

        combineddata = combineddata + `${placeid} - Revenue\n` + JSON.stringify(Revenue) + `\n` 

        fs.writeFile(`${placeid}__game_statistics.json`, combineddata, err => {
            if (err) {
            console.error(err);
            }
            // file written successfully
        });
        combineddataall = combineddataall + combineddata + `\n\n\n`
        i = i + 1
    }
}


startApp()