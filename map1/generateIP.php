<?php
  $randIP = "".mt_rand(0,255).".".mt_rand(0,255).".".mt_rand(0,255).".".mt_rand(0,255);
  echo file_get_contents("http://freegeoip.net/json/" . $randIP)
?>
