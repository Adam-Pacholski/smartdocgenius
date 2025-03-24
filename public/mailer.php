
<?php
// Disable error reporting for production
// error_reporting(0);

// Configuration
$recipient = 'info@ap-development.eu';  // Replace with your email address
$subject_prefix = '[APDocs Contact Form] ';

// Get form data
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Validate data
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Wszystkie pola są wymagane.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Nieprawidłowy adres email.']);
    exit;
}

// Prepare email content
$email_subject = $subject_prefix . $subject;
$email_body = "Imię i nazwisko: $name\n";
$email_body .= "Email: $email\n\n";
$email_body .= "Wiadomość:\n$message\n";

// Set headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mail_sent = mail($recipient, $email_subject, $email_body, $headers);

if ($mail_sent) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.']);
}
?>
