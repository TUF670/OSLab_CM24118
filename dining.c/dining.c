#include<stdio.h>
#include<windows.h>

#define N 5

void philosopher(int id){
    printf("Philosopher %d is thinking\n", id);
    Sleep(1000);

    printf("Philosopher %d picked left chopstick\n", id);
    printf("Philosopher %d picked right chopstick\n", id);

    printf("Philosopher %d is eating\n", id);
    Sleep(1000);

    printf("Philosopher %d finished eating\n\n", id);
}

int main(){
    int i;
    for(i=0;i<N;i++){
        philosopher(i);
    }
    return 0;
}