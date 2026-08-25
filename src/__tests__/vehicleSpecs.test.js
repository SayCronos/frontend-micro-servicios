import { describe, it, expect } from 'vitest';
import { getVehicleSpecs, PORSCHE_COLORS, PORSCHE_WHEELS, PORSCHE_INTERIORS } from '../utils/vehicleSpecs';

describe('Vehicle Specs Utility Tests', () => {
  it('should generate sport telemetry specs for sport type', () => {
    const product = { name: 'Porsche 911 GT3 RS', type: 'sport', price: 223800 };
    const specs = getVehicleSpecs(product);

    expect(specs.powerCV).toBe(650);
    expect(specs.accel0100).toBe('2.7 s');
    expect(specs.topSpeed).toBe('330 km/h');
    expect(specs.engine).toContain('Boxer 6');
  });

  it('should generate default performance specs for general models', () => {
    const product = { name: 'Porsche Carrera', type: 'coupe', price: 120000 };
    const specs = getVehicleSpecs(product);

    expect(specs.powerCV).toBe(450);
    expect(specs.accel0100).toBe('3.4 s');
    expect(specs.topSpeed).toBe('305 km/h');
    expect(specs.engine).toContain('Boxer 6');
  });

  it('should provide 8 high-fidelity Porsche paint colors', () => {
    expect(PORSCHE_COLORS).toHaveLength(8);
    const guardsRed = PORSCHE_COLORS.find((c) => c.name.includes('Guards Red'));
    expect(guardsRed).toBeDefined();
    expect(guardsRed.hex).toBe('#d5001c');
  });

  it('should provide valid wheel and interior options', () => {
    expect(PORSCHE_WHEELS.length).toBeGreaterThan(0);
    expect(PORSCHE_INTERIORS.length).toBeGreaterThan(0);
  });
});
