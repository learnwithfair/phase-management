<?php

include "../class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

// DELETE SLOT/TABLE ITEM

if ( isset( $_POST, $_GET['id'] ) ) {
    $updateResult = $obj->deleteSlot( $_GET['id'] );
    if ( $updateResult != null ) {
        $result['msg'] = "Successfully Deleted";
        $jsonResponse = json_encode( $result );
        echo $jsonResponse;
    } else {
        $error['msg'] = "Something Wrong";
        echo json_encode( $error );
    }

}

?>