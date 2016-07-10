<?
header('Content-type: application/json');
include('../php/mail.php');


function SendMail($form) {

	$mail = new Mail();
	
	$mail_from = 'ira.left@gmail.com';
	$mail_to = 'ira.left@gmail.com';
	
	$mail_html = 'Имя: '.mysql_escape_string($form['name']).'<br>';
	$mail_html .= 'Телефон: '.mysql_escape_string($form['phone']).'<br>';
	$mail_html .= 'Email: '.mysql_escape_string($form['email']).'<br>';
	if($mail->send('no-reply', $mail_from, $mail_to, $mail_to, 'UTF-8', 'UTF-8', 'Slfmade order', $mail_html)) 
		return true;
	else
		return false;
}

echo json_encode(SendMail($_REQUEST['form']));
?>