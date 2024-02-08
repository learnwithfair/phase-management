<?php
###########################################################################
//                      INITIALIZATION OF FUNCTION'S
###########################################################################

include "../class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

###########################################################################
//          CALLING FUNCTION AFTER CLICK SUBMIT BUTTON
###########################################################################

// GET ALL SLOTS ITEM
$tableName = "slot";
$slotItems = $obj->findAll( $tableName );
if ( $slotItems != null ) {
    $jsonResponse = json_encode( $slotItems ); // Convert into JSON
    echo $jsonResponse;
} else {
    $error['msg'] = "Something Wrong";
    echo json_encode( $error );
}

?>