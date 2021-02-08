<?php

$dirs = ['left', 'right', 'up'];
$frames = [];
foreach ($dirs as $key => $value) {
    $temp = scandir($value);
    array_shift($temp);
    array_shift($temp);
    $frames[$value] = $temp;
}

echo "<pre>";
print_r($frames);
echo "</pre>";
