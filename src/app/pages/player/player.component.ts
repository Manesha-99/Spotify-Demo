import {
  Component,
  computed,
  effect,
  EnvironmentInjector,
  inject,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { SongPlay } from '../../models/song.play.model';
import { PlayerService } from '../../service/player.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player',
  imports: [FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent implements OnInit {
  songListQueue = signal<SongPlay[]>([]);
  now_playSong = signal<SongPlay | null>(null);
  //songFromUser!: SongPlay

  constructor(private playerService: PlayerService) {
    runInInjectionContext(inject(EnvironmentInjector), () => {
      effect(() => {
        const song = this.now_playSong();
        console.log(song);
        if (song) {
          this.duration.set(song.duration || 0);
          this.currentTime.set(0);
        }
      });
    });
  }

  ngOnInit(): void {
    this.playerService.currentSong$.subscribe((song) => {
      if (song) {
        this.playSong(song);
        this.songListQueue()[0] = song;
      }
    });

    this.playerService.queueSong$.subscribe((song) => {
      if (song) {
        this.addToQueue(song);
      }
    });
  }

  duration = signal(0);
  currentTime = signal(0);
  isPlaying = signal(false);
  timer: any;

  defaultOnPlay() {
    clearInterval(this.timer);
    this.isPlaying.set(false);
    this.currentTime.set(0);
    this.togglePlay();
  }

  togglePlay() {
    this.isPlaying.update((p) => !p);
    if (this.isPlaying()) {
      this.startTimer();
    } else {
      clearInterval(this.timer);
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.currentTime() < this.duration()) {
        this.currentTime.update((v) => v + 1);
      } else if (this.currentTime() == this.duration()) {
        this.nextSong();
      } else {
        this.isPlaying.update((p) => !p);
        clearInterval(this.timer);
      }
    }, 1000);
  }

  seekTo(event: any) {
    this.currentTime.set = event.target.value;
  }

  playSong(currentSong: SongPlay) {
    this.now_playSong.set(currentSong);
    this.defaultOnPlay();
  }

  addToQueue(song: SongPlay) {
    if (!this.songListQueue().some((s) => s.id === song.id)) {
      this.songListQueue.update((queue) => [...queue, song]);
      alert(`Song added to the queue....`);
      console.log(this.songListQueue().length);
    } else {
      alert(`Song Already Added to the queue....`);
    }
  }

  nextSong() {
    const queue = this.songListQueue();
    if (!queue.length) {
      alert(`No songs in the queue....`);
      return;
    }

    const currentIndex = queue.findIndex(
      (s) => s.id === this.now_playSong()?.id
    );
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      this.playSong(queue[nextIndex]);
      this.defaultOnPlay();
    } else {
      alert(`All Songs have been played....`);
    }
  }

  previousSong() {
    const queue = this.songListQueue();
    if (!queue.length) {
      alert(`No songs in the queue....`);
      return;
    }

    const currentIndex = queue.findIndex(
      (s) => s.id === this.now_playSong()?.id
    );
    const previousIndex = currentIndex - 1;
    if (previousIndex > -1) {
      this.playSong(queue[previousIndex]);
    } else {
      alert(`No songs in the queue....`);
    }
  }

  formattedTime = computed(() => {
    const totalSeconds = this.currentTime();
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}.${seconds.toString().padStart(2, '0')}`;
  });

  formattedDuration = computed(() => {
    const total = this.duration();
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${min}.${sec.toString().padStart(2, '0')}`;
  });
}
