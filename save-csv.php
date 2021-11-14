<?php

   // Collect the form data.
$name = filter_input(INPUT_POST, 'name');
$email = filter_input(INPUT_POST, 'email');
$message = filter_input(INPUT_POST, 'message');
$date = date('Y-m-d H:i:s');

// print 'Your name is: ' . $name . ' <br />';
// print 'Your email is: ' . $email  . ' <br />'; 
// print 'Your message is: ' . $message . ' <br />';

$form_data = array(
	'name' => $name,
	'email' => $email,
	'message' => $message,
	'date' => $date,
	);

$file_open = fopen('array.csv','a');

fputcsv($file_open, $form_data);

header('Location: generic.html');
?>