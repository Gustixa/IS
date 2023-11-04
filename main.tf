provider "aws" {
  region = "us-east-2"  # Región de Este de los Estados Unidos (Ohio)
}

resource "aws_instance" "mi_instancia" {
  ami           = "amzn::3::brcauvg"
  instance_type = "t2.micro"
  key_name      = "AKIAYPWUQ547LK2RRM2Q" 
  
  tags = {
    Name = "Beca" 
  }
}

resource "aws_security_group" "seg" {
  name        = "seg"
  description = "Reglas de seguridad para Beca"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
