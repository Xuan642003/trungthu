/**
 * Ambient Mid-Autumn traditional music synthesizer using Web Audio API
 * Generates peaceful Asian bamboo flute (tiêu/sáo) and traditional harp (đàn tranh/guzheng) pentatonic notes.
 */

class MidAutumnAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlayingState = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private volumeLevel = 0.45;

  // D Pentatonic scale (D4, E4, F#4, A4, B4, D5, E5, F#5, A5)
  private scale = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99, 880.0];
  
  // Traditional melody motif steps
  private melodySeq = [
    0, 2, 4, 3, 2, 0, 1, 2,
    4, 5, 7, 6, 5, 4, 2, 3,
    7, 6, 4, 5, 4, 2, 0, 1,
    2, 4, 3, 2, 0, 2, 0, 0
  ];
  private step = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volumeLevel, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays a single plucked harp / đàn tranh sound
  private playPluck(freq: number, time: number, duration: number, gainValue = 0.25) {
    if (!this.ctx || !this.masterGain) return;
    
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, time);
    filter.frequency.exponentialRampToValueAtTime(600, time + duration);

    noteGain.gain.setValueAtTime(0.001, time);
    noteGain.gain.linearRampToValueAtTime(gainValue, time + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Plays a soft bamboo flute / sáo trúc breathy note
  private playFlute(freq: number, time: number, duration: number, gainValue = 0.18) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm vibrato
    vibrato.frequency.setValueAtTime(5.2, time);
    vibratoGain.gain.setValueAtTime(4.5, time);
    vibrato.connect(osc.frequency);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, time);
    filter.Q.setValueAtTime(1.2, time);

    noteGain.gain.setValueAtTime(0.001, time);
    noteGain.gain.linearRampToValueAtTime(gainValue, time + 0.15);
    noteGain.gain.setValueAtTime(gainValue * 0.9, time + duration * 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    vibrato.start(time);
    osc.start(time);
    vibrato.stop(time + duration);
    osc.stop(time + duration);
  }

  // Ambient gentle wind chimes
  private playBell(freq: number, time: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 2.5);
  }

  public async togglePlay(): Promise<boolean> {
    this.initContext();

    if (this.isPlayingState) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.initContext();
    if (this.isPlayingState) return;
    this.isPlayingState = true;

    const tick = () => {
      if (!this.isPlayingState || !this.ctx) return;
      const now = this.ctx.currentTime;
      const noteIdx = this.melodySeq[this.step % this.melodySeq.length];
      const freq = this.scale[noteIdx % this.scale.length];

      // Flute plays the main gentle line
      this.playFlute(freq, now, 1.4, 0.16);

      // Pluck accompaniment
      if (this.step % 2 === 0) {
        const bassFreq = this.scale[(noteIdx + 4) % this.scale.length] / 2;
        this.playPluck(bassFreq, now + 0.1, 1.8, 0.22);
      }
      if (this.step % 4 === 1) {
        const highFreq = this.scale[(noteIdx + 2) % this.scale.length];
        this.playPluck(highFreq, now + 0.45, 1.2, 0.15);
      }

      // Wind chime bells randomly on full moon
      if (Math.random() < 0.25) {
        this.playBell(1318.51 + Math.random() * 400, now + 0.3);
      }

      this.step++;
      this.timer = window.setTimeout(tick, 900);
    };

    tick();
  }

  public pause() {
    this.isPlayingState = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public setVolume(val: number) {
    this.volumeLevel = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volumeLevel, this.ctx.currentTime);
    }
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }
}

export const midAutumnAudio = new MidAutumnAudioPlayer();
