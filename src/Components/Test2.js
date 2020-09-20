import React from 'react';
// import Drag from './Forms/Drag';
// import TreeDropDown from './Forms/TreeDropDown';
import VariablePicker from './Forms/VariablePicker';
import { Profile } from './Forms/ProfileData';
import DS3Frame from '../assets/SVG/ImageBorders/DS3Frame.svg';

const ArcheAge = {
  Game: 'ArcheAge',
  Title: "Koy's Stats",
  Values: [
    {
      Value: 'Page One',
      Values: [
        {
          Value: 'Visible Player Stats',
          Type: 'Calc',
          Level: '',
          Total: 18864,
          Min: 732,
          Max: 61440,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Health',
              Num: {
                result: 2172,
                expression: '12 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
              },
              Min: {
                result: 36,
                expression: '12 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
              },
              Max: {
                result: 30720,
                expression: '12 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
              },
              Unit: '',
            },
            {
              Value: 'Mana',
              Num: {
                result: 16692,
                expression: '12 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
              },
              Min: {
                result: 696,
                expression: '12 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
              },
              Max: {
                result: 30720,
                expression: '12 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
              },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Primary Stats',
          Type: 'Static',
          Level: 2560,
          Total: 1922,
          Min: 82,
          Max: 12800,
          Points: {
            result: 2560,
            expression: 'a * 1',
            vars:
              '{"a":["Values","Page One","Values","Primary Stats","Level"],"b":["Values","Page One","Values","Primary Stats","Level"]}',
          },
          Values: [
            {
              Value: 'Strength',
              Num: { result: 15, expression: '15', vars: '{}' },
              Min: { result: 15, expression: '15', vars: '{}' },
              Max: { result: 2560, expression: '2560', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Agility',
              Num: { result: 119, expression: '119', vars: '{}' },
              Min: { result: 3, expression: '3', vars: '{}' },
              Max: { result: 2560, expression: '2560', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Stamina',
              Num: { result: 181, expression: '181', vars: '{}' },
              Min: { result: 3, expression: '3', vars: '{}' },
              Max: { result: 2560, expression: '2560', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Spirit',
              Num: { result: 216, expression: '216', vars: '{}' },
              Min: { result: 3, expression: '3', vars: '{}' },
              Max: { result: 2560, expression: '2560', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Intelligence',
              Num: { result: 1391, expression: '1391', vars: '{}' },
              Min: { result: 58, expression: '58', vars: '{}' },
              Max: { result: 2560, expression: '2560', vars: '{}' },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Secondary Stats',
          Type: 'Calc',
          Level: '',
          Total: '',
          Min: 19.4,
          Max: 7168,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Melee Attack',
              Num: {
                result: 20.6,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Num"]}',
              },
              Min: {
                result: 0.6,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Min"]}',
              },
              Max: {
                result: 512,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Max"]}',
              },
              Unit: '',
            },
            {
              Value: 'Range Attack',
              Num: {
                result: 23.8,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Num"]}',
              },
              Min: {
                result: 0.6,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Min"]}',
              },
              Max: {
                result: 512,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Max"]}',
              },
              Unit: '',
            },
            {
              Value: 'Magic Attack',
              Num: {
                result: 278.2,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
              },
              Min: {
                result: 11.6,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
              },
              Max: {
                result: 512,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
              },
              Unit: '',
            },
            {
              Value: 'Healing Power',
              Num: {
                result: 43.2,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Num"]}',
              },
              Min: {
                result: 11.6,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Min"]}',
              },
              Max: {
                result: 512,
                expression: '0.2 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Max"]}',
              },
              Unit: '',
            },
            {
              Value: 'Healing Power',
              Num: {
                result: 181,
                expression: '1 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
              },
              Min: {
                result: 3,
                expression: '1 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
              },
              Max: {
                result: 2560,
                expression: '1 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
              },
              Unit: '',
            },
            {
              Value: 'Magic Defense',
              Num: {
                result: 181,
                expression: '1 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
              },
              Min: {
                result: 3,
                expression: '1 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
              },
              Max: {
                result: 2560,
                expression: '1 * a',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
              },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Misc Stats',
          Type: 'Calc',
          Level: '',
          Total: '',
          Min: 104.56,
          Max: 1278.54,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Move Speed',
              Num: { result: 5.4, expression: '5.4', vars: '{}' },
              Min: { result: 5.4, expression: '5.4', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: 'm/s',
            },
            {
              Value: 'Cast Time',
              Num: {
                result: 82.83,
                expression:
                  '100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013)))',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Num"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
              },
              Min: {
                result: 99.16,
                expression:
                  '100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013)))',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Min"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
              },
              Max: {
                result: 68.54,
                expression:
                  '100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013)))',
                vars:
                  '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Max"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
              },
              Unit: '%',
            },
            {
              Value: 'Attack Speed',
              Num: { result: 190, expression: '190', vars: '{}' },
              Min: { result: 0, expression: '0', vars: '{}' },
              Max: { result: 1200, expression: '1200', vars: '{}' },
              Unit: '%',
            },
          ],
        },
      ],
    },
    {
      Value: 'Page Two: Attack Details',
      Values: [
        {
          Value: 'Melee Attack',
          Type: 'Calc',
          Level: '',
          Total: 7,
          Min: 7,
          Max: 70,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Melee Attack Speed',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Melee Accuracy',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Melee Critical Status',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Melee Critical Damage',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Backstab Melee Damage',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Melee Skill Damage',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'PvE Melee Skills',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Ranged Attack',
          Type: 'Calc',
          Level: '',
          Total: 6,
          Min: 6,
          Max: 60,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Ranged Accuracy',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Ranged Critical Status',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Ranged Critical Damage',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Backstab Ranged Damage',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Ranged Skill Damage',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'PvE Ranged Skills',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Magic Attack',
          Type: 'Calc',
          Level: '',
          Total: 6,
          Min: 6,
          Max: 60,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Magic Accuracy',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Magic Critical Status',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Magic Critical Damage',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Backstab Magic Damage',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Magic Skill Damage',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'PvE Magic Skills',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Misc',
          Type: 'Calc',
          Level: '',
          Total: 5,
          Min: 5,
          Max: 50,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Focus',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Shield Defense Penetration Rate',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Shield Defense Penetration',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Defense Penetration',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Magic Defense Penetration',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
      ],
    },
    {
      Value: 'Page Three: Defense Details',
      Values: [
        {
          Value: 'Defense',
          Type: 'Calc',
          Level: '',
          Total: 7,
          Min: 7,
          Max: 70,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Parry Rate',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Shield Block Rate',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Evasion',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Resiliance',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Toughness',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Siege Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'PvE Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Melee Defense',
          Type: 'Calc',
          Level: '',
          Total: 3,
          Min: 3,
          Max: 30,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Melee Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Fixed Melee Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'PvE Melee Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Ranged Defense',
          Type: 'Calc',
          Level: '',
          Total: 3,
          Min: 3,
          Max: 30,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Ranged Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Fixed Ranged Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'PvE Ranged Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Magic Defense',
          Type: 'Calc',
          Level: '',
          Total: 3,
          Min: 3,
          Max: 30,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Magic Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Fixed Magic Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'PvE Magic Damage Reduction',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
      ],
    },
    {
      Value: 'Regen/Misc',
      Values: [
        {
          Value: 'Heal',
          Type: 'Calc',
          Level: '',
          Total: 4,
          Min: 4,
          Max: 40,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Critical Heal Rate',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Critical Heal Bonus',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Healing',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Healing Skill Damage',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Regeneration',
          Type: 'Calc',
          Level: '',
          Total: 4,
          Min: 4,
          Max: 40,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Heal Regen',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Continuous Heal Regen',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Mana Regen',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Post-Cast Mana Regen',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
        {
          Value: 'Misc',
          Type: 'Calc',
          Level: '',
          Total: 5,
          Min: 5,
          Max: 50,
          Points: { result: 0, expression: '0', vars: '{}' },
          Values: [
            {
              Value: 'Received Healing',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Increased experience gain',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Loot Drop Rate',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Gold earned from hunting',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
            {
              Value: 'Stealth Detection',
              Num: { result: 1, expression: '1', vars: '{}' },
              Min: { result: 1, expression: '1', vars: '{}' },
              Max: { result: 10, expression: '10', vars: '{}' },
              Unit: '',
            },
          ],
        },
      ],
    },
  ],
};

const AA = new Profile(ArcheAge);

const Test2 = () => {
  // onClick show path
  const onClick = (e) => {
    const { value } = e.target;
    console.warn('onClick:', value.getPath());
  };

  return <div>{DS3Frame}</div>;
};

export default Test2;
