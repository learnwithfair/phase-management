<?php
###########################################################################
//                      INITIALIZATION OF FUNCTION'S
###########################################################################

include "../class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

###########################################################################
//          CALLING FUNCTION AFTER CLICK SUBMIT BUTTON
###########################################################################

// UPDATE TEXT TABLE

if ( isset( $_POST, $_GET['id'] ) ) {
    $updateResult = $obj->updateText( $_GET['id'], $_POST );
    if ( $updateResult != null ) {
        $result['msg'] = "Successfully Updated";
        $jsonResponse = json_encode( $result );
        echo $jsonResponse;
    } else {
        $error['msg'] = "Something Wrong";
        echo json_encode( $error );
    }

}

?>