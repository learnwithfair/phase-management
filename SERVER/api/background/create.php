<?php
###########################################################################
//                      INITIALIZATION OF FUNCTION'S
###########################################################################

include "../class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

###########################################################################
//          CALLING FUNCTION AFTER CLICK SUBMIT BUTTON
###########################################################################

// CREATE BACKGROUND
if ( isset( $_POST ) ) {
    $result = $obj->createBackground( $_POST );
    if ( $result === true ) {
        $jsonResponse = json_encode( array( "msg" => "Background successfully created" ) );
        echo $jsonResponse;
    } elseif ( $result != null ) {
        $error['msg'] = $result;
        echo json_encode( $error );
    } else {
        $error['msg'] = "Something Wrong";
        echo json_encode( $error );
    }

}

?>