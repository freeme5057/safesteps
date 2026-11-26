<?php
require 'db.php';
header('Content-Type: application/json');

$ref = isset($_GET['ref']) ? strtoupper(trim($_GET['ref'])) : '';

if (!$ref) {
    echo json_encode(['error' => 'No reference number']);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM reports WHERE reference_number = ?");
$stmt->execute([$ref]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if ($row) {
    echo json_encode($row);
} else {
    echo json_encode(['error' => 'Not found']);
}
?>