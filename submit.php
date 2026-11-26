<?php
require 'db.php';
header('Content-Type: application/json');

$location = trim($_POST['location'] ?? '');
$hazard_type = trim($_POST['hazard_type'] ?? $_POST['hazard'] ?? '');
$description = trim($_POST['description'] ?? '');
$reporter_name = trim($_POST['reporter_name'] ?? $_POST['name'] ?? '');
if ($reporter_name === '') $reporter_name = 'Anonymous';
$spoken_language = trim($_POST['spoken_language'] ?? $_POST['language'] ?? 'English');
$transcription = trim($_POST['transcription'] ?? $_POST['transcription_text'] ?? '');

if ($location === '' || $hazard_type === '' || $description === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Location, hazard type and description are required']);
    exit;
}

// Generate a UNIQUE reference like SS-2026-004 (check it doesn't already exist)
do {
    $ref = 'SS-' . date('Y') . '-' . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT);
    $check = $pdo->prepare("SELECT 1 FROM reports WHERE reference_number = ? LIMIT 1");
    $check->execute([$ref]);
} while ($check->fetch());

try {
    $stmt = $pdo->prepare("INSERT INTO reports (reference_number, reporter_name, location, hazard_type, description, spoken_language, transcription_text, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())");
    $stmt->execute([$ref, $reporter_name, $location, $hazard_type, $description, $spoken_language, $transcription]);
    echo json_encode(['success' => true, 'reference_number' => $ref]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>