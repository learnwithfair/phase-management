<?php
###########################################################################
//                      INITIALIZATION OF FUNCTION'S
###########################################################################

include "../class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

###########################################################################
//          CALLING FUNCTION AFTER CLICK SUBMIT BUTTON
###########################################################################

// CREATE BUTTON ITEMS

if ( isset( $_POST ) ) {
    $createResult = $obj->createButton( $_POST );
    if ( $createResult === true ) {
        $result['msg'] = "Successfully Added";
        $jsonResponse = json_encode( $result );
        echo $jsonResponse;
    } elseif ( $createResult != null ) {
        $error['msg'] = $createResult;
        echo json_encode( $error );
    } else {
        $error['msg'] = "Something Wrong";
        echo json_encode( $error );
    }

}

?>