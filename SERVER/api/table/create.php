<?php
###########################################################################
//                      INITIALIZATION OF FUNCTION'S
###########################################################################

include "../class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

###########################################################################
//          CALLING FUNCTION AFTER CLICK SUBMIT BUTTON
###########################################################################

// CREATE SLOT
if ( isset( $_POST ) ) {
    $slotId = $obj->createSlot( $_POST );
    if ( $slotId != null ) {
        $jsonResponse = json_encode( $slotId );
        echo $jsonResponse;
    } else {
        $error['msg'] = "Something Wrong";
        echo json_encode( $error );
    }

}

?>