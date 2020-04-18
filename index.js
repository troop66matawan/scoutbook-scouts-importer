const csvToJson = require('csvtojson');
const Scout = require('scoutbook-scout');

exports.scoutbook_scouts_importer = function (importPath) {
    return csvToJson()
        .on('header', function (header) {
            console.log(header);
        })
        .fromFile(importPath)
        .then(function (importedData) {
            let scouts = [];
            importedData.forEach(importedScout => {
                const newScout = new Scout(
                    importedScout['BSA Member ID'],
                    importedScout['First Name'],
                    importedScout['Middle Name'],
                    importedScout['Last Name'],
                );
                newScout.suffix = importedScout['Suffix'];
                newScout.nickname = importedScout['Nickname'];
                newScout.address1 = importedScout['Address 1'];
                newScout.address2 = importedScout['Address 2'];
                newScout.city = importedScout['City'];
                newScout.state = importedScout['State'];
                newScout.zip = importedScout['Zip'];
                newScout.homePhone = importedScout['Home Phone'];
                newScout.gender = importedScout['Gender'];
                newScout.dob = importedScout['DOB'];
                newScout.schoolGrade = importedScout['School Grade'];
                newScout.schoolName = importedScout['School Name'];
                newScout.LDS = importedScout['LDS'];
                newScout.swimmingClassification = importedScout['Swimming Classification'];
                newScout.swimmingClassificationDate = importedScout['Swimming Classification Date'];
                newScout.unitNumber = importedScout['Unit Number'];
                newScout.unitType = importedScout['Unit Type'];
                newScout.dateJoinedBSA = importedScout['Date Joined Scouts BSA'];
                newScout.denType = importedScout['Den Type'];
                newScout.denNumber = importedScout['Den Number'];
                newScout.dateJoinedDen = importedScout['Date Joined Den'];
                newScout.patrolName = importedScout['Patrol Name'];
                newScout.dateJoinedPatrol = importedScout['Date Joined Patrol'];
                newScout.parent1Email = importedScout['Parent 1 Email'];
                newScout.parent2Email = importedScout['Parent 2 Email'];
                newScout.parent3Email = importedScout['Parent 3 Email'];
                newScout.oaMemberNum = importedScout['OA Member Number'];
                newScout.oaElectionDate = importedScout['OA Election Date'];
                newScout.oaOrdealDate = importedScout['OA Ordeal Date'];
                newScout.oaBrotherhoodDate = importedScout['OA Brotherhood Date'];
                newScout.oaVigilDate = importedScout['OA Vigil Date'];
                newScout.oaActive = importedScout['OA Active'];

                scouts.push(newScout);
            });
            return scouts;
            //console.log(json);
        });
};

if (process.argv.length !== 3) {
    console.log('Usage: ' + process.argv[1] + ' <scoutbook_advancement.csv file to import>');
} else {
    exports.scoutbook_scouts_importer(process.argv[2])
        .then(function (scouts) {
            console.log(scouts);
        })
        .catch(function (err) {
            console.error(err.message);
        });
}

