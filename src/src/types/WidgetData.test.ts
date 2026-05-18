import { WidgetData } from './WidgetData';

describe('WidgetData', () => {
  it('should have the required enabled property as boolean', () => {
    const widgetData: WidgetData = {
      enabled: true,
    };
    
    expect(widgetData.enabled).toBe(true);
    expect(typeof widgetData.enabled).toBe('boolean');
  });

  it('should allow optional channel property to be undefined', () => {
    const widgetData: WidgetData = {
      enabled: false,
    };
    
    expect(widgetData.enabled).toBe(false);
    expect(widgetData.channel).toBeUndefined();
  });

  it('should allow optional channel property to be a string when present', () => {
    const widgetData: WidgetData = {
      enabled: true,
      channel: 'test-channel',
    };
    
    expect(widgetData.enabled).toBe(true);
    expect(widgetData.channel).toBe('test-channel');
    expect(typeof widgetData.channel).toBe('string');
  });

  it('should properly handle different boolean values for enabled', () => {
    const widgetDataTrue: WidgetData = {
      enabled: true,
    };
    
    const widgetDataFalse: WidgetData = {
      enabled: false,
    };
    
    expect(widgetDataTrue.enabled).toBe(true);
    expect(widgetDataFalse.enabled).toBe(false);
  });

  it('should handle empty channel string as valid', () => {
    const widgetData: WidgetData = {
      enabled: true,
      channel: '',
    };
    
    expect(widgetData.enabled).toBe(true);
    expect(widgetData.channel).toBe('');
  });

  it('should be compatible with object structure', () => {
    const widgetData: WidgetData = {
      enabled: true,
      channel: 'some-channel',
    };
    
    expect(widgetData).toEqual({
      enabled: true,
      channel: 'some-channel',
    });
    
    expect(Object.prototype.hasOwnProperty.call(widgetData, 'enabled')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(widgetData, 'channel')).toBe(true);
  });
});