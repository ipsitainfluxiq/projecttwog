<?php
/**
 * Created by PhpStorm.
 * User: debasiskar
 * Date: 09/01/18
 * Time: 4:50 AM
 */



// Generated by curl-to-PHP: http://incarnate.github.io/curl-to-php/
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://www.datairis.co/V1/auth/subscriber/?AccessToken=98968-b860b-4ba3");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");


$headers = array();
$headers[] = "Subscriberid: 58";
$headers[] = "Subscriberusername: GeoAISub";
$headers[] = "Subscriberpassword: reference";
$headers[] = "Accountusername: geoai";
$headers[] = "Accountpassword: reference";
$headers[] = "Accountdetailsrequired: true";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);

print_r($result) ;