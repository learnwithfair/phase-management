<?php
###########################################################################
//                      INITIALIZATION OF FUNCTION'S
###########################################################################

include "../class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

###########################################################################
//          CALLING FUNCTION AFTER CLICK SUBMIT BUTTON
###########################################################################

// UPDATE BUTTON FILES

if ( isset( $_POST, $_GET['id'] ) ) {
    $updateResult = $obj->updateButtonFiles( $_GET['id'], $_POST );
    if ( $updateResult === true ) {
        $result['msg'] = "Successfully Updated";
        $jsonResponse = json_encode( $result );
        echo $jsonResponse;
    } else {
        $error['msg'] = "Something Wrong";
        echo json_encode( $error );
    }

}

?>