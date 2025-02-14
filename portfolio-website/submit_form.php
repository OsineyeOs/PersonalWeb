<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Invalid email format";
        header("Location: contact.html?error=" . rawurlencode($error_message));
        exit();
    }

    $to = "valid_email@example.com"; // Replace with your email
    $subject = "New Contact Form Submission from $name";
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: contact@yourdomain.com"; // Replace with a valid email address from your domain

    if (!mail($to, $subject, $body, $headers)) {
        $error_message = "Failed to send email to admin";
        header("Location: contact.html?error=" . rawurlencode($error_message));
        exit();
    }
    }

    // Auto-response
    $user_subject = "Thank you for contacting us!";
    $user_body = "Hi $name,\n\nThanks for reaching out! I'll get back to you soon.\n\nBest,\nOluwaseun";
    $user_headers = "From: no-reply@yourdomain.com";

    if (!mail($email, $user_subject, $user_body, $user_headers)) {
        $error_message = "Failed to send auto-response email";
        header("Location: contact.html?error=" . rawurlencode($error_message));
        exit();
    }

    header("Location: contact.html?success=1", true, 303);
    $user_headers = "From: no-reply@yourdomain.com";

    mail($email, $user_subject, $user_body, $user_headers);

    header("Location: contact.html?success=1");
    exit();
}
?>
