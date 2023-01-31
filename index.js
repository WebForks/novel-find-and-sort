const fs = require('fs');
const anilist = require('anilist-node');
const Anilist = new anilist();

function renameSubdirectoriesToAnilistID(directoryPath) {
    // Read the subdirectories in the directory
    fs.readdir(directoryPath, (err,files) => {
        // If there's an error, log it to the console
        if (err) {
            console.error(err);
            return;
        }

        for (const file of files) {
            //construct the full path to the subdirectory
            const filePath = `${directoryPath}/${file}`;
            // Get the stats of the subdirectory
            fs.stat(filePath, (err, stats) => {
                // If there's an error, log it to the console
                if (err) {
                    console.error(err);
                    return;
                }
                
                // If the stats indicate that the file is a directory
                if (stats.isDirectory()) {
                    let myFilter = {
                        format: "NOVEL"
                    }

                    // Search for the subdirectory name on Anilist
                    Anilist.searchEntry.manga(file,myFilter).then(results => {
                        //if theres a match
                        if (results.media.length > 0){
                            //Get the first match
                            const anime = results.media[0]
                            //constructs the new path with the id as the new name
                            const newFilePath = `${directoryPath}/${anime.id}`;
                            //Rename the subdirectory
                            fs.rename(filePath,newFilePath,(err) =>{
                                //if theres an error, log it to the console
                                if (err) {
                                    console.error(err)
                                }
                            })
                        }
                    })
                }
                else {
                    console.log(`No match found for subdirectory: ${file}`);
                }
            })

        }
    })
}

renameSubdirectoriesToAnilistID('path/to/directory');
