#include "timetable.h"

Subject subjects[SUBJECT_COUNT] = {
    {"ET",   "Ethical Hacking"},
    {"OS",   "Operating Systems"},
    {"CN",   "Computer Networks"},
    {"DSL",  "Data Structures Lab"},
    {"MATH", "Engineering Mathematics"}
};

Teacher teachers[TEACHER_COUNT] = {
    {"T01", "Ms. Shiwani Bhaskar"},
    {"T02", "Mrs. Meenakshi Sharma"},
    {"T03", "Dr. K.C Purohit"}
};

Room rooms[ROOM_COUNT] = {
    {"R101", "Lecture"},
    {"R102", "Lecture"},
    {"LAB1", "Lab"}
};

Batch batches[BATCH_COUNT] = {
    {"CS2", "CSE Sem 3 - Section A"}
};

const char *dayNames[DAYS] = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
