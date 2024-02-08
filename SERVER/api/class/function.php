<?php

// #### Tables of Contents ######

// +PUBLIC SECTION
// Functions Names -> [findAll,findOne,findByConditions,deleteByConditions,uploadSingleFile,uploadFile,deleteFiles]

// +SLOT TABLE
// Function Names -> [createSlot,]

// +BACKGROUND TABLE
// Function Names -> [createBackground,updateBackgroundFiles,updateBackgroundParams]

// +ELEMENTS TABLE
// Function Names -> [createElement,updateElementParams,deleteElement]

// +TEXT TABLE
// Function Names -> [createText,updateText]

// +BUTTON TABLE
// Function Names -> [createButton,updateButtonParams,updateButtonFiles,buttonFilesDelete]

// +GET ALL INFO

// Create class
class PhaseManagement {
    // Variable Initialization
    private $conn;
    private $baseURL;

    // Create constructor and initialize data from config file
    public function __CONSTRUCT() {

        // Include Database Configuration File
        include "config.php";

        // Connect Database using config data
        $this->conn = mysqli_connect( $bdhost, $dbuser, $dbpassword, $dbname );
        if ( !( $this->conn ) ) {
            die( "Database connection Error!!" );
        }

        // Setting Base URL from config data
        $this->baseURL = $baseURL;

    }

###########################################################################################
//                                      PUBLIC
###########################################################################################
    // Display All Info
    public function findAll( $tableName ) {
        // Initial Array Variable
        $data = array();

        $displayQuery = "SELECT * FROM $tableName ORDER BY _id ASC";
        try {
            $queryData = mysqli_query( $this->conn, $displayQuery );
            if ( isset( $queryData ) ) {
                // Convert into JSON array
                while ( $row = mysqli_fetch_assoc( $queryData ) ) {
                    $data[] = $row;
                }
                return $data;
            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            return null;
        }

    }

    // Display single Item By conditions
    public function findOne( $tableName, $conditions ) {
        $displayQuery = "SELECT * FROM $tableName WHERE $conditions";
        try {
            $queryData = mysqli_query( $this->conn, $displayQuery );
            $displayQueryData = mysqli_fetch_array( $queryData );
            if ( isset( $displayQueryData ) ) {
                return $displayQueryData;
            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            return null;
        }
    }

    // Display Multiple Item By conditions
    public function findByConditions( $tableName, $conditions ) {
        $displayQuery = "SELECT * FROM $tableName WHERE $conditions";
        $data = array();

        $queryData = mysqli_query( $this->conn, $displayQuery );
        if ( isset( $queryData ) ) {
            while ( $row = mysqli_fetch_assoc( $queryData ) ) {
                $data[] = $row;
            }
        }
        return $data;
    }

    // Delete Single Item By conditions
    public function deleteByConditions( $tableName, $conditions ) {
        $deleteQuery = "DELETE FROM $tableName WHERE $conditions";
        try {
            $deleteResult = mysqli_query( $this->conn, $deleteQuery );
            if ( isset( $deleteResult ) ) {
                return true;
            }

        } catch ( \Throwable $th ) {
            return null;
        }}

    // Upload Single file
    public function uploadSingleFile( $fileName, $tempFileName, $currentDirectory ) {
        // Handle file upload
        if ( isset( $fileName, $tempFileName ) ) {

            // Define upload directory
            $uploadDir = "uploads/";

            // Create directory if it doesn't exist
            if ( !file_exists( $uploadDir ) ) {
                mkdir( $uploadDir, 0777, true );
            }

            // Generate unique filenames
            $uid = uniqid();
            $udir = $uploadDir . $uid . '/';
            mkdir( $udir, 0777, true );

            // Move the uploaded files to the upload directory
            $filePath = $udir . $fileName;
            move_uploaded_file( $tempFileName, $filePath );

            // Return File Full Path Name
            return $this->baseURL . $currentDirectory . $filePath;
        } else {
            // Invalid request
            http_response_code( 400 );
            return null;
        }
    }

    // Handle file upload (ATLAS + JSON + IMAGE)
    public function uploadFile( $currentDirectory ) {

        $atlasFile = $_FILES['atlas'];
        $jsonFile = $_FILES['json'];
        $imageFile = $_FILES['image'];

        // Define upload directory
        $uploadDir = 'uploads/';

        // Create directory if it doesn't exist
        if ( !file_exists( $uploadDir ) ) {
            mkdir( $uploadDir, 0777, true );
        }

        // Generate unique filenames
        $uid = uniqid();
        $udir = $uploadDir . $uid . '/';
        mkdir( $udir, 0777, true );

        $atlasFileName = $atlasFile['name'];
        $jsonFileName = $jsonFile['name'];
        $imageFileName = $imageFile['name'];

        // Move the uploaded files to the upload directory
        $atlasFilePath = $udir . $atlasFileName;
        $jsonFilePath = $udir . $jsonFileName;
        $imageFilePath = $udir . $imageFileName;

        move_uploaded_file( $atlasFile['tmp_name'], $atlasFilePath );
        move_uploaded_file( $jsonFile['tmp_name'], $jsonFilePath );
        move_uploaded_file( $imageFile['tmp_name'], $imageFilePath );

        // Return URLs as JSON
        $response = array(
            'atlas' => $this->baseURL . $currentDirectory . $atlasFilePath,
            'json'  => $this->baseURL . $currentDirectory . $jsonFilePath,
            'image' => $this->baseURL . $currentDirectory . $imageFilePath,
        );

        header( 'Content-Type: application/json' );
        return json_encode( $response );

    }
    // Delete (altas+json+image)  Files
    public function deleteFiles( $files, $currentDirectory, $replaceValue = "" ) {
        try {
            $json_output = json_decode( $files );
            foreach ( $json_output as $filesPath ) {
                // Generate Original Path
                $originalPath = str_replace( $this->baseURL . $currentDirectory, $replaceValue, $filesPath );
                if ( file_exists( $originalPath ) ) {
                    // Delete Uploaded File
                    unlink( $originalPath );
                }

            }
            return true;
        } catch ( \Throwable $th ) {
            return null;
        }

    }

###########################################################################################
//                                      /PUBLIC
###########################################################################################

###########################################################################################
//                                      SLOT TABLE
###########################################################################################

    // Create Slot
    public function createSlot( $data ) {
        // Get Value After submit Form
        $name = $data['name'];
        $image = ""; // Initial Image Path = ""

        if ( isset( $_FILES['image'] ) ) {
            $imageName = $_FILES['image']['name'];
            $tempImage = $_FILES['image']['tmp_name'];

            // Upload Image
            $uploadResult = $this->uploadSingleFile( $imageName, $tempImage, "table/" );
            if ( isset( $uploadResult ) ) {
                $image = $uploadResult; // Set Original Image Path
            }
        }

        // Insert Slot Table's Item
        $createSlotQuery = "INSERT INTO slot(name,image) VALUES('$name','$image')";
        try {
            if ( mysqli_query( $this->conn, $createSlotQuery ) ) {
                // Get Inserted Item
                // $slotId = $this->findOne( "slot", "name='$name'&&image='$image'" )['_id'];
                $slotId = $this->findOne( "slot", "name='$name'" )['_id'];

                // Initialize Text Table's Value
                $data1 = array( "slot_id" => $slotId, "phase_no" => 1, "text" => "Scegli il Jazz Clube scopri il numero di giri gratuiti", "posX" => 0, "posY" => 0 );
                $data2 = array( "slot_id" => $slotId, "phase_no" => 2, "text" => "Scegli il Jazz Clube scopri il numero di giri gratuiti", "posX" => 0, "posY" => 0 );

                // Automatically Create Two Text Rows by above data
                $res1 = $this->createText( $data1 );
                $res2 = $this->createText( $data2 );
                if ( isset( $res1, $res2 ) ) {
                    return array( 'slot_id' => $slotId );
                } else {
                    return null;
                }

            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            return array( "mgs" => "$name is Already Exits" );
        }

    }

    // Delete Slot by Id
    public function deleteSlot( $id ) {

        // Delete's Condition
        $condition = "slot_id=$id";
        $slotConditions = "_id=$id";

        // All Tables Current Directory
        $backgroundDirectory = "background/";
        $elementDirectory = "element/";
        $slotDirectory = "table/";

        // Get indevidual Table Data by slot_id
        $backgroundData = $this->findByConditions( "background", $condition );
        $elementsData = $this->findByConditions( "elements", $condition );
        $buttonData = $this->findByConditions( "button", $condition );
        $slotData = $this->findOne( "slot", $slotConditions );

        // Delete Foreign Key Value From All Tables
        $this->deleteByConditions( "background", $condition );
        $this->deleteByConditions( "elements", $condition );
        $this->deleteByConditions( "button", $condition );
        $this->deleteByConditions( "text", $condition );

        $deleteResult = $this->deleteByConditions( "slot", $slotConditions );

        if ( $deleteResult ) {

            // Delete Uploded Files
            foreach ( $backgroundData as $item ) {
                $this->deleteFiles( $item['files'], $backgroundDirectory, "../background/" );
            }
            foreach ( $elementsData as $item ) {
                $this->deleteFiles( $item['files'], $elementDirectory, "../element/" );
            }
            foreach ( $buttonData as $item ) {
                $this->buttonFilesDelete( $item["link_normal"], $item["link_hover"], $item["link_click"], "../button/" );
            }

            try {
                if ( !empty( $slotData['image'] ) ) {
                    // Generate Original Path
                    $originalPath = str_replace( $this->baseURL . $slotDirectory, "", $slotData['image'] );
                    if ( file_exists( $originalPath ) ) {
                        // Delete uploaded file
                        unlink( $originalPath );
                    }
                }

            } catch ( \Throwable $th ) {
                return null;
            }
            return true;

        } else {
            return null;
        }

    }

###########################################################################################
//                                      /SLOT TABLE
###########################################################################################

###########################################################################################
//                                      BACKGROUND TABLE
###########################################################################################
    // Create Background
    public function createBackground( $data ) {

        // Initializatoion of variables
        $currentDirectory = "background/";
        $files = "";

        // Get Value After submit Form
        $slot_id = $data['slot_id'];
        $phase_no = $data['phase_no'];
        $posX = $data['posX'];
        $posY = $data['posY'];
        $width = $data['width'];
        $height = $data['height'];

        // Single Image Upload
        if ( isset( $_FILES['single_image'] ) ) {
            $singleImagePath = $this->uploadSingleFile( $_FILES['single_image']['name'], $_FILES['single_image']['tmp_name'], $currentDirectory );
            if ( isset( $singleImagePath ) ) {
                $imagePath = array(
                    "single_image" => $singleImagePath,
                );
                header( 'Content-Type: application/json' );
                $files = json_encode( $imagePath );
            }
        }
        // Atlas + JSON + Image Upload
        elseif ( isset( $_FILES['atlas'], $_FILES['json'], $_FILES['image'] ) ) {
            // For Upload FIles
            $multipleImagePath = $this->uploadFile( $currentDirectory );
            if ( isset( $multipleImagePath ) ) {
                $files = $multipleImagePath;
            }
        }

        // Insert Text Table's Item
        $createTextQuery = "INSERT INTO background(slot_id,phase_no,files,posX,posY,width,height) VALUES($slot_id,$phase_no,'$files',$posX,$posY,$width,$height)";
        try {
            if ( mysqli_query( $this->conn, $createTextQuery ) ) {
                return true;
            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            // Remove Uploded file If data is not insert
            $this->deleteFiles( $files, $currentDirectory, "" );
            return "Slot Id '$slot_id' is Not Found In the Slot Table";
        }
    }

    // Update Background Files
    public function updateBackgroundFiles( $id, $data ) {

        // Initializatoion of variables
        $currentDirectory = "background/";
        $files = "";

        // Get Value After submit Form
        $slot_id = $data['slot_id'];
        $phase_no = $data['phase_no'];

        // Single Image Upload
        if ( isset( $_FILES['single_image'] ) ) {
            $singleImagePath = $this->uploadSingleFile( $_FILES['single_image']['name'], $_FILES['single_image']['tmp_name'], $currentDirectory );
            if ( isset( $singleImagePath ) ) {
                $imagePath = array(
                    "single_image" => $singleImagePath,
                );
                header( 'Content-Type: application/json' );
                $files = json_encode( $imagePath );
            }
        }
        // (Atlas + JSON + Image) Files Upload
        elseif ( isset( $_FILES['atlas'], $_FILES['json'], $_FILES['image'] ) ) {
            // For Upload FIles
            $multipleImagePath = $this->uploadFile( $currentDirectory );
            if ( isset( $multipleImagePath ) ) {
                $files = $multipleImagePath;
            }
        }

        // Display Previous Info
        $previousData = $this->findOne( "background", "_id=$id" );

        // Update Text Table's Files
        $updateQuery = "UPDATE background SET slot_id=$slot_id,phase_no=$phase_no,files='$files' WHERE _id=$id";
        try {
            if ( mysqli_query( $this->conn, $updateQuery ) ) {
                // Previous Files Delete
                $this->deleteFiles( $previousData['files'], $currentDirectory );
                return true;

            } else {
                // Remove Uploded file If data is not insert
                $this->deleteFiles( $files, $currentDirectory );
                return null;
            }
        } catch ( \Throwable $th ) {
            // Remove Uploded file If data is not insert
            $this->deleteFiles( $files, $currentDirectory );
            return "Slot Id '$slot_id' is Not Found In the Slot Table";
        }
    }

    // Update Background Params
    public function updateBackgroundParams( $id, $data ) {

        // Get Value After submit Form
        $slot_id = $data['slot_id'];
        $phase_no = $data['phase_no'];
        $posX = $data['posX'];
        $posY = $data['posY'];
        $width = $data['width'];
        $height = $data['height'];

        // Update Text Table's Params
        $updateQuery = "UPDATE background SET slot_id=$slot_id,phase_no=$phase_no,posX=$posX,posY=$posY,width=$width,height=$height WHERE _id=$id";
        try {
            if ( mysqli_query( $this->conn, $updateQuery ) ) {
                return true;

            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            return "Slot Id '$slot_id' is Not Found In the Slot Table";
        }
    }

###########################################################################################
//                                      /BACKGROUND TABLE
###########################################################################################

###########################################################################################
//                                      ELEMENTS TABLE
###########################################################################################
    // Create Background
    public function createElement( $data ) {

        // Initializatoion of variables
        $currentDirectory = "element/";
        $files = "";

        // Get Value After submit Form
        $slot_id = $data['slot_id'];
        $phase_no = $data['phase_no'];
        $posX = $data['posX'];
        $posY = $data['posY'];
        $scale = $data['scale'];
        $animation = $data['animation'];
        $time = $data['time'];

        // Atlas + JSON + Image Upload
        if ( isset( $_FILES['atlas'], $_FILES['json'], $_FILES['image'] ) ) {
            // For Upload FIles
            $multipleImagePath = $this->uploadFile( $currentDirectory );
            if ( isset( $multipleImagePath ) ) {
                $files = $multipleImagePath;
            }
        }

        // Insert Text Table's Item
        $createElementQuery = "INSERT INTO elements(slot_id,phase_no,files,posX,posY,scale,animation,time) VALUES($slot_id,$phase_no,'$files',$posX,$posY,$scale,'$animation','$time')";
        try {
            if ( mysqli_query( $this->conn, $createElementQuery ) ) {
                // Get Inserted Item
                $element_id = $this->findOne( "elements", "animation='$animation'&&slot_id=$slot_id" )['_id'];
                return $element_id;
            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            // Remove Uploded file  ( Atlas+JSON+image) If data is not insert
            $this->deleteFiles( $files, $currentDirectory );
            return "Slot Id '$slot_id' is Not Found In the Slot Table";
        }
    }

    // Update Background Params
    public function updateElementParams( $id, $data ) {

        // Get Value After submit Form
        $posX = $data['posX'];
        $posY = $data['posY'];
        $scale = $data['scale'];
        $animation = $data['animation'];
        $time = $data['time'];

        // Update Elemtnts Table's Params
        $updateQuery = "UPDATE elements SET posX=$posX,posY=$posY,scale=$scale,animation='$animation',time='$time' WHERE _id=$id";
        try {
            if ( mysqli_query( $this->conn, $updateQuery ) ) {
                return true;
            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            return null;
        }
    }

    // Update Background Files
    public function deleteElement( $id ) {

        // Initializatoion of variables
        $currentDirectory = "element/";

        // Display Previous Info
        $previousData = $this->findOne( "elements", "_id=$id" );

        // Delete Elements
        $deleteResult = $this->deleteByConditions( "elements", "_id=$id" );

        if ( $deleteResult ) {

            // Previous Files Delete
            $this->deleteFiles( $previousData['files'], $currentDirectory );
            return true;

        } else {
            return null;
        }
    }

###########################################################################################
//                                      /ELEMENTS TABLE
###########################################################################################

###########################################################################################
//                                      TEXT TABLE
###########################################################################################
    // Create Text
    public function createText( $data ) {
        // Get Value After submit Form
        $slot_id = $data['slot_id'];
        $phase_no = $data['phase_no'];
        $text = mysqli_real_escape_string( $this->conn, $data['text'] );
        $posX = $data['posX'];
        $posY = $data['posY'];

        // Insert Text Table's Item
        $createTextQuery = "INSERT INTO text(slot_id,phase_no,text,posX,posY) VALUES($slot_id,$phase_no,'$text',$posX,$posY)";
        try {
            if ( mysqli_query( $this->conn, $createTextQuery ) ) {
                return true;
            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            return null;
        }

    }
    // Update Text
    public function updateText( $id, $data ) {
        // Get Value After submit Form
        $slot_id = $data['slot_id'];
        $phase_no = $data['phase_no'];
        $text = mysqli_real_escape_string( $this->conn, $data['text'] );
        $posX = $data['posX'];
        $posY = $data['posY'];

        // Update Text Table's Item
        $updateQuery = "UPDATE text SET slot_id=$slot_id,phase_no=$phase_no,text='$text',posX=$posX,posY=$posY WHERE _id=$id";
        try {
            if ( mysqli_query( $this->conn, $updateQuery ) ) {
                return true;
            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            return null;
        }

    }

###########################################################################################
//                                      /TEXT TABLE
###########################################################################################

###########################################################################################
//                                      BUTTON TABLE
###########################################################################################
    // Create Button
    public function createButton( $data ) {

        // Initial File Path = ""
        $link_normal = "";
        $link_hover = "";
        $link_click = "";
        $currentDirectory = "button/";

        // Get Value After submit Form
        $slot_id = $data['slot_id'];
        $text = mysqli_real_escape_string( $this->conn, $data['text'] );
        $posX = $data['posX'];
        $posY = $data['posY'];

        // Upload Files
        if ( isset( $_FILES['link_normal'], $_FILES['link_hover'], $_FILES['link_click'] ) ) {

            // Upload Image -> uploadSingleFile(FileName, TempName, UloadedMainPath)
            $linkNormalResult = $this->uploadSingleFile( $_FILES['link_normal']['name'], $_FILES['link_normal']['tmp_name'], $currentDirectory );
            $linkHoverResult = $this->uploadSingleFile( $_FILES['link_hover']['name'], $_FILES['link_hover']['tmp_name'], $currentDirectory );
            $linkClickResult = $this->uploadSingleFile( $_FILES['link_click']['name'], $_FILES['link_click']['tmp_name'], $currentDirectory );
            if ( isset( $linkNormalResult, $linkHoverResult, $linkClickResult ) ) {
                $link_normal = $linkNormalResult; // Set Original File Path
                $link_hover = $linkHoverResult; // Set Original File Path
                $link_click = $linkClickResult; // Set Original File Path
            }
        }

        // Insert Button Table's Item
        $createButtontQuery = "INSERT INTO button(slot_id,link_normal,link_hover,link_click,text,posX,posY) VALUES($slot_id,'$link_normal','$link_hover','$link_click','$text',$posX,$posY)";
        try {
            if ( mysqli_query( $this->conn, $createButtontQuery ) ) {
                return true;
            } else {
                // Remove File if Data is not insert
                $this->buttonFilesDelete( $link_normal, $link_hover, $link_click );
                return null;
            }
        } catch ( \Throwable $th ) {
            // Remove File if Data is not insert
            $this->buttonFilesDelete( $link_normal, $link_hover, $link_click );
            return "Slot Id '$slot_id' is Not Found In the Slot Table";
        }

    }

    // Update Button Params
    public function updateButtonParams( $id, $data ) {
        // Get Value After submit Form
        $slot_id = $data['slot_id'];
        $text = mysqli_real_escape_string( $this->conn, $data['text'] );
        $posX = $data['posX'];
        $posY = $data['posY'];

        // Update Text Table's Item
        $updateQuery = "UPDATE button SET slot_id=$slot_id,text='$text',posX=$posX,posY=$posY WHERE _id=$id";
        try {
            if ( mysqli_query( $this->conn, $updateQuery ) ) {
                return true;
            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            return null;
        }

    }

    // Update Button Filrs
    public function updateButtonFiles( $id, $data ) {

        // Initial File Path = ""
        $link_normal = "";
        $link_hover = "";
        $link_click = "";
        $currentDirectory = "button/";

        // Get Previous Button Data by id
        $buttonData = $this->findOne( "button", "_id=$id" );

        // Upload Files
        if ( isset( $_FILES['link_normal'], $_FILES['link_hover'], $_FILES['link_click'] ) ) {

            // Upload Image -> uploadSingleFile(FileName, TempName, UloadedMainPath)
            $linkNormalResult = $this->uploadSingleFile( $_FILES['link_normal']['name'], $_FILES['link_normal']['tmp_name'], $currentDirectory );
            $linkHoverResult = $this->uploadSingleFile( $_FILES['link_hover']['name'], $_FILES['link_hover']['tmp_name'], $currentDirectory );
            $linkClickResult = $this->uploadSingleFile( $_FILES['link_click']['name'], $_FILES['link_click']['tmp_name'], $currentDirectory );
            if ( isset( $linkNormalResult, $linkHoverResult, $linkClickResult ) ) {
                $link_normal = $linkNormalResult; // Set Original File Path
                $link_hover = $linkHoverResult; // Set Original File Path
                $link_click = $linkClickResult; // Set Original File Path
            }
        }

        // Update Text Table's Files
        $updateQuery = "UPDATE button SET link_normal='$link_normal',link_hover='$link_hover',link_click='$link_click' WHERE _id=$id";
        try {
            if ( mysqli_query( $this->conn, $updateQuery ) ) {
                // Remove Previous File if Data is successfully insert
                $this->buttonFilesDelete( $buttonData["link_normal"], $buttonData["link_hover"], $buttonData["link_click"] );
                return true;
            } else {
                return null;
            }
        } catch ( \Throwable $th ) {
            // Remove File if Data is not update
            $this->buttonFilesDelete( $link_normal, $link_hover, $link_click );
            return null;
        }

    }

    public function buttonFilesDelete( $link_normal, $link_hover, $link_click, $replaceValue = "" ) {
        $currentDirectory = "button/";
        try {
            // Generate Original Path
            $nomalPath = str_replace( $this->baseURL . $currentDirectory, $replaceValue, $link_normal );
            $hoverPath = str_replace( $this->baseURL . $currentDirectory, $replaceValue, $link_hover );
            $clickPath = str_replace( $this->baseURL . $currentDirectory, $replaceValue, $link_click );

            // Existing Check and delete uploaded Files
            if ( file_exists( $nomalPath ) ) {
                unlink( $nomalPath );
            }if ( file_exists( $hoverPath ) ) {
                unlink( $hoverPath );
            }if ( file_exists( $clickPath ) ) {
                unlink( $clickPath );
            }
            return true;
        } catch ( \Throwable $th ) {
            return null;
        }

    }

###########################################################################################
//                                      /BUTTON TABLE
###########################################################################################

###########################################################################################
//                                      GET ALL INFO
###########################################################################################
    public function getAllInfo( $id, $phase_no ) {
        /// Initial Array Variable
        $allData = array();

        // Filtered Conditions
        $conditions = "slot_id=$id&&phase_no=$phase_no";

        try {
            // Get indevidual Table Data and Set into allData array
            $allData["background"] = $this->findByConditions( "background", $conditions );
            $allData["elements"] = $this->findByConditions( "elements", $conditions );
            $allData["text"] = $this->findByConditions( "text", $conditions );
            $allData["button"] = $this->findByConditions( "button", "slot_id=$id" );

            // Return Final Data
            return $allData;

        } catch ( \Throwable $th ) {
            return null;
        }
    }
}