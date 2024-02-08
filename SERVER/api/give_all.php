<?php
###########################################################################
//                      INITIALIZATION OF FUNCTION'S
###########################################################################

include "./class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

###########################################################################
//          CALLING FUNCTION AFTER CLICK SUBMIT BUTTON
###########################################################################

// GIVE ALL BY SLOT ID AND PHASE

// if ( isset( $_GET['id'], $_GET['phase'] ) ) {
if ( isset( $_GET['id'], $_GET['phase'] ) ) {
    $getAllInfo = $obj->getAllInfo( $_GET['id'], $_GET['phase'] );
    if ( $getAllInfo ) {
        $jsonResponse = json_encode( $getAllInfo );
        echo $jsonResponse;

    } else {
        $error['msg'] = "Something Wrong";
        echo json_encode( $error );
    }

}

?>