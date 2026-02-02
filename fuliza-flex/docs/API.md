# Fuliza Flex API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
All requests require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Endpoints

### Health Check
```
GET /health
```

### Authentication

#### Send OTP
```
POST /auth/phone
Body: { "phone": "+254712345678" }
Response: { "message": "OTP sent to phone number" }
```

#### Verify OTP
```
POST /auth/verify
Body: { "phone": "+254712345678", "otp": "123456" }
Response: { "token": "jwt_token", "user": {...} }
```

### Orders

#### Get Orders
```
GET /orders
Response: [{ id, amount, status, date, ... }]
```

#### Create Order
```
POST /orders
Body: { "amount": 25000, "phone": "+254712345678" }
Response: { "order_id": "FZ-20260202-001", "status": "pending" }
```

#### Get Order Details
```
GET /orders/:id
Response: { id, amount, status, payment_status, ... }
```

### M-Pesa Payments

#### Initiate STK Push
```
POST /mpesa/stk-push
Body: { 
  "phone": "+254712345678", 
  "amount": 25000, 
  "order_id": "FZ-20260202-001" 
}
Response: { "request_id": "16813-1590515892", "status": "initiated" }
```

#### Payment Callback (Webhook)
```
POST /mpesa/callback
Body: { "Body": { "stkCallback": {...} } }
Response: { "ResultCode": 0, "ResultDesc": "Accepted" }
```

#### Check Payment Status
```
GET /mpesa/status/:request_id
Response: { "status": "completed", "receipt": "MPG12345", ... }
```

## Error Responses
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "status": 400
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
