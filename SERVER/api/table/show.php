<?php

include "../class/function.php"; // Include All functon
$obj = new PhaseManagement(); // Create object

// SHOW SLOT/TABLE ITEM BY ID

if ( isset( $_GET['id'] ) ) {
    $slotId = $_GET['id'];
    $showResult = $obj->findOne( "slot", "_id=$slotId" );
    if ( $showResult != null ) {
        $jsonResponse = json_encode( $showResult );
        echo $jsonResponse;
    } else {
        $error['msg'] = "No Result Found";
        echo json_encode( $error );
    }

}

?>