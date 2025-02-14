<?php
use PHPUnit\Framework\TestCase;

class SubmitFormTest extends TestCase
{
    protected function setUp(): void
    {
        $_POST = [];
        $_SERVER = [];
    }

    public function testValidFormSubmission()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['name'] = 'John Doe';
        $_POST['email'] = 'john@example.com';
        $_POST['message'] = 'Test message';

        $this->expectOutputRegex('/Location: contact.html\?success=1/');
        
        include 'submit_form.php';
    }

    public function testInvalidEmailFormat()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['name'] = 'John Doe';
        $_POST['email'] = 'invalid-email';
        $_POST['message'] = 'Test message';

        $this->expectOutputRegex('/Location: contact.html\?error=Invalid\+email\+format/');
        
        include 'submit_form.php';
    }

    public function testEmptyFormSubmission()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['name'] = '';
        $_POST['email'] = '';
        $_POST['message'] = '';

        $this->expectOutputRegex('/Location: contact.html\?error=Invalid\+email\+format/');
        
        include 'submit_form.php';
    }

    public function testXSSPrevention()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['name'] = '<script>alert("xss")</script>';
        $_POST['email'] = 'test@example.com';
        $_POST['message'] = '<img src="x" onerror="alert(1)">';

        ob_start();
        include 'submit_form.php';
        $output = ob_get_clean();

        $this->assertStringNotContainsString('<script>', $output);
        $this->assertStringNotContainsString('onerror=', $output);
    }

    public function testNonPostRequest()
    {
        $_SERVER['REQUEST_METHOD'] = 'GET';
        
        ob_start();
        include 'submit_form.php';
        $output = ob_get_clean();

        $this->assertEmpty($output);
    }
}
