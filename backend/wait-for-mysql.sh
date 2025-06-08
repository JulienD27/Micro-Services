#!/bin/sh

echo "Attente de MySQL à l'adresse $MYSQL_HOST:$MYSQL_PORT..."

# Par défaut
: "${MYSQL_HOST:=mysql}"
: "${MYSQL_PORT:=3306}"

# Boucle jusqu'à ce que MySQL réponde
until nc -z "$MYSQL_HOST" "$MYSQL_PORT"; do
  echo "MySQL n'est pas encore prêt - attente..."
  sleep 2
done

echo "MySQL est prêt !"
