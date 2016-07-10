<?	   
class Mail { 
	private function mime_header_encode($str, $data_charset, $send_charset) {
	  if($data_charset != $send_charset) {
		$str = iconv($data_charset, $send_charset, $str);
	  }
	  return '=?' . $send_charset . '?B?' . base64_encode($str) . '?=';
	}

			  
	public function send($name_from, $email_from, $name_to, $email_to, $data_charset, $send_charset, $subject, $body, $filename= '', $reply_to = FALSE) {

	 
		if ($filename != '') {  
			$fp = fopen($filename,"rb");   
			if (!$fp)   
			{ print "Cannot open file";   
			  exit();   
			}   
			$file = fread($fp, filesize($filename));   
			fclose($fp);   
		} 
		
	  $to = $this->mime_header_encode($name_to, $data_charset, $send_charset). ' <' . $email_to . '>';
	  $subject = $this->mime_header_encode($subject, $data_charset, $send_charset);
	  $from = $this->mime_header_encode($name_from, $data_charset, $send_charset).' <' . $email_from . '>';

	  if($data_charset != $send_charset) {
		$body = iconv($data_charset, $send_charset, $body);
	  }

	  $EOL = "\r\n";
	  $boundary     = "--".md5(uniqid(time()));
	  $headers = '';  
	  $headers .= "Mime-Version: 1.0\r\n";  
	  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"$EOL";
	  $headers .= "From: $from\r\n";  
	  if ($reply_to) {
		  $headers .= "Reply-To: $reply_to";
	  }  

		$multipart  = "--$boundary$EOL";  
		$multipart .= "Content-Type: text/html; boundary=\"$boundary\"$EOL";	
		$multipart .= $EOL; 	
		$multipart .= $body; 
		
		
		if ($filename != '') { 
			$multipart .=  "$EOL--$boundary$EOL";   
			$multipart .= "Content-Type: application/octet-stream; name=\"$filename\"$EOL";   
			$multipart .= "Content-Transfer-Encoding: base64$EOL";   
			$multipart .= "Content-Disposition: attachment; filename=\"$filename\"$EOL";   
			$multipart .= $EOL; 
			$multipart .= chunk_split(base64_encode($file));   
			$multipart .= "$EOL--$boundary--$EOL";  
		}
		
		$body = $mail_header.$body.$mail_footer;	
		return mail($to, $subject, $multipart, $headers);
	}
}	
?>