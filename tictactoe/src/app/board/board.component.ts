import {Component, signal, WritableSignal} from '@angular/core';
import {SquareComponent} from '../square/square.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    SquareComponent,
    MatCard,
    MatCardContent,
    MatButtonToggle,
    NgForOf,
    NgIf,
    MatButton
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  protected board: WritableSignal<(Player | null)[]> = signal(Array(9).fill(null));
  protected currentPlayer: Player = Player.X;
  protected isWinner: boolean = false;

  protected makeMove(index: number): void {
    if (!this.board()[index] && !this.isWinner) {
      const updatedBoard = [...this.board()];
      updatedBoard[index] = this.currentPlayer;
      this.board.set(updatedBoard);
      this.isWinner = this.checkWinner();
      if (!this.isWinner) {
        this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
      }
    }
  }
// Überprüft das Board auf Gewinnerkombinationen
  private checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination =>
      combination.every(index => this.board()[index] === this.currentPlayer)
    );
  }
// Neustart
  protected restart(): void {
    this.board.set(Array(9).fill(null));
    this.currentPlayer = Player.X;
    this.isWinner = false;
  }
}
enum Player {
  X = 'X',
  O = 'O'
}

