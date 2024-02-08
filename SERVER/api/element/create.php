<?php
###########################################################################
//                      INITIALIZATION OF FUNCTION'S
###########################################################################

include "../class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

###########################################################################
//          CALLING FUNCTION AFTER CLICK SUBMIT BUTTON
###########################################################################

// CREATE ELEMENTS

if ( isset( $_POST ) ) {
    $elementId = $obj->createElement( $_POST );
    if ( $elementId ) {
        $result['element_id'] = $elementId;
        $result['msg'] = "Successfully Added";
        $jsonResponse = json_encode( $result );
        echo $jsonResponse;
    } else {
        $error['msg'] = "Something Wrong";
        echo json_encode( $error );
    }

}

?>