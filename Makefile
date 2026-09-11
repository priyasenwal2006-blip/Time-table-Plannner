CC      = gcc
CFLAGS  = -Wall -Wextra -Iinclude
SRC     = src/main.c src/data.c src/grid.c
TARGET  = timetable
WEB_DIR = web
WEB_PORT = 8080

$(TARGET): $(SRC)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRC)

run: $(TARGET)
	./$(TARGET)

web:
	@echo "Open http://localhost:$(WEB_PORT) in your browser"
	@python3 -m http.server $(WEB_PORT) --directory $(WEB_DIR)

clean:
	rm -f $(TARGET)

.PHONY: run web clean
