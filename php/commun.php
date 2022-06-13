

<?php

session_start();
if (!isset($_SESSION['random_number'])){
    $_SESSION['random_number'] = rand(0,100);
}
 
 
 
$randomNumber = $_SESSION["random_number"]; 
 


$id = $_GET["id"];


$curl = curl_init('https://t5bx8bo2.directus.app/items/session1/'.$id);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$headers = array(
    "Accept: application/json",
    "Authorization: Bearer toto",
 );
 curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$data = curl_exec($curl);

if ($data === false){
    var_dump(curl_error($curl));
}
else{
    if(isset($_GET["input_value1"]) && isset($_GET["input_value2"]) && isset($_GET["input_value3"])&& isset($_GET["input_value4"])){
        $input_value1 = $_GET["input_value1"];
        $input_value2 = $_GET["input_value2"];
        $input_value3 = $_GET["input_value3"];
        $input_value4 = $_GET["input_value4"];
        $data = json_decode($data);
        $php = $data->data->php;
        eval ($php);
        //echo ($_GET["input_value1"]);
        //echo ($_GET["input_value2"]);
        //echo ($_GET["input_value3"]);
    }
    elseif(isset($_GET["input_value1"]) && isset($_GET["input_value2"]) && isset($_GET["input_value3"]) ){
        $input_value1 = $_GET["input_value1"];
        $input_value2 = $_GET["input_value2"];
        $input_value3 = $_GET["input_value3"];
        $data = json_decode($data);
        $php = $data->data->php;
        eval ($php);
        //echo ($_GET["input_value1"]);
        //echo ($_GET["input_value2"]);
        //echo ($_GET["input_value3"]);
    }
    elseif(isset($_GET["input_value1"]) && isset($_GET["input_value2"]) ){
        $input_value1 = $_GET["input_value1"];
        $input_value2 = $_GET["input_value2"];
        $data = json_decode($data);
        $php = $data->data->php;
        eval ($php);
        //echo ($_GET["input_value1"]);
        //echo ($_GET["input_value2"]);
    }
    elseif(isset($_GET["input_value1"])){
        $input_value1 = $_GET["input_value1"];      
        $data = json_decode($data);
        $php = $data->data->php;
        eval ($php);
        //echo ($_GET["input_value1"]);

    }

    else {
        echo "RIEN";
        return;
    }

}
curl_close($curl);





?>
