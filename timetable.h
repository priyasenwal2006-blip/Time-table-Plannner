#ifndef TIMETABLE_H
#define TIMETABLE_H

#define DAYS  6
#define SLOTS 4

#define SUBJECT_COUNT 5
#define TEACHER_COUNT 3
#define ROOM_COUNT    3
#define BATCH_COUNT   1

typedef struct {
    char code[10];
    char name[40];
} Subject;

typedef struct {
    char id[10];
    char name[40];
} Teacher;

typedef struct {
    char id[10];
    char type[10];   /* "Lecture" or "Lab" */
} Room;

typedef struct {
    char id[10];
    char name[40];
} Batch;

typedef struct {
    int subjectIndex;
    int teacherIndex;
    int roomIndex;
    int batchIndex;
    int isEmpty;     /* 1 = empty slot, 0 = occupied */
} ClassSlot;

extern Subject subjects[SUBJECT_COUNT];
extern Teacher teachers[TEACHER_COUNT];
extern Room rooms[ROOM_COUNT];
extern Batch batches[BATCH_COUNT];

extern ClassSlot timetable[DAYS][SLOTS];
extern const char *dayNames[DAYS];

void initTimetable(void);
void placeClass(int day, int slot, int subjIdx, int teachIdx, int roomIdx, int batchIdx);
void placeSampleClasses(void);
void printTimetable(void);
void printLegend(void);

#endif
