#include <stdio.h>
#include <stdlib.h>

int main() {
    int req[] = {98,183,41,122,14,124,65,67};
    int n = 8;
    int head = 53;

    int visited[8] = {0};
    int total = 0;

    for(int i=0;i<n;i++) {
        int min = 999, pos = -1;

        for(int j=0;j<n;j++) {
            if(!visited[j]) {
                int dist = abs(head - req[j]);
                if(dist < min) {
                    min = dist;
                    pos = j;
                }
            }
        }

        visited[pos] = 1;
        total += min;
        head = req[pos];
    }

    printf("Total Head Movement = %d\n", total);

    return 0;
}