<?php
date_default_timezone_set('America/Los_Angeles');

function removeOldFiles($location) {
    // perform deletion issues
  $path = $location;
  if ($handle = opendir($path)) {
    while (false !== ($file = readdir($handle))) {
      if (preg_match('/\.json$/i', $file)) {
        if ((time()-filectime($path.$file)) >= 3600) {  
            unlink($path.$file);
        }
      }
    }
  }
}

$hDate = date('Y_m_d_H_i') . ".json";
$location = "loc/";
if (!file_exists($location . $hDate)) {
  $content = file_get_contents("http://wikiwatch.libfoobar.so/api/en-wikipedia/anon/hourly/last/1/top/20");
  $batchArray = json_decode($content);
  $ipArray = array();
  foreach ($batchArray as $l1Key => $l1Value) {
    foreach ($l1Value as $l2Key => $l2Value) {
      foreach ($l2Value as $l3Key => $l3Value) {
        if (is_array($l3Value)) {
          foreach ($l3Value as $l4Key => $l4Value) {
            $ipArray[] = json_decode(file_get_contents("http://freegeoip.net/json/" . $l4Value->key));
          }
        }
      }
    }
  }

  $myfile = fopen($location . $hDate, "w");
  fwrite($myfile, json_encode($ipArray));
  fclose($myfile);
  // clean up after yourself
  removeOldFiles($location);
}
echo json_encode(file_get_contents($location . $hDate), true);
//echo json_encode(file_get_contents("loc/2015_02_19_08_38.alt.json"), true);
?>
