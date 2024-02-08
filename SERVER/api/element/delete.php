<?php
###########################################################################
//                      INITIALIZATION OF FUNCTION'S
###########################################################################

include "../class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

###########################################################################
//          CALLING FUNCTION AFTER CLICK SUBMIT BUTTON
###########################################################################

// DELETE ELEMENTS BY ID

if ( isset( $_GET['id'] ) ) {
    $deleteResult = $obj->deleteElement( $_GET['id'] );
    if ( $deleteResult === true ) {
        $result['msg'] = "Successfully Deleted";
        $jsonResponse = json_encode( $result );
        echo $jsonResponse;
    } else {
        $error['msg'] = "Something Wrong";
        echo json_encode( $error );
    }

}

?>